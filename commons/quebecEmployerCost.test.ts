import {
  CNESST_SECTOR_RATES,
  computeQuebecEmployerCost,
  computeQuebecMandatoryContributions,
  getHsfRate,
} from "./quebecEmployerCost";
import {
  computeDayRateComparison,
  computeAutonomyOverhead,
  computeHiringFriction,
  BILLABLE_WEEKS_PER_YEAR,
  CONSULTANT_WORKING_WEEKS_PER_YEAR,
  DEFAULT_COORDINATION_HOURS_PER_WEEK,
  DEFAULT_PRODUCTIVE_DAYS,
  PAID_DAYS_PER_WEEK,
  QUEBEC_STAT_HOLIDAYS,
  WORK_DAYS_PER_YEAR,
} from "./dayRateComparison";
import { getCalculatorRolePreset, WORKPLACE_ANNUAL_COST } from "./costCalculatorPresets";

function sumMandatory(lines: { amount: number }[]): number {
  return lines.reduce((total, line) => total + line.amount, 0);
}

describe("getHsfRate", () => {
  it("uses 1.65 % for PME with payroll at or below 1 M$", () => {
    expect(getHsfRate(275_000)).toBe(0.0165);
    expect(getHsfRate(1_000_000)).toBe(0.0165);
  });

  it("scales between 1 M$ and 7.8 M$ per Revenu Québec 2026 formula", () => {
    expect(getHsfRate(850_000)).toBeCloseTo(0.0165, 6);
    expect(getHsfRate(4_000_000)).toBeCloseTo((1.2662 + (0.3838 * 4_000_000) / 1_000_000) / 100, 6);
  });

  it("uses 4.26 % at 7.8 M$ and above", () => {
    expect(getHsfRate(7_800_000)).toBe(0.0426);
    expect(getHsfRate(12_000_000)).toBe(0.0426);
  });
});

describe("computeQuebecMandatoryContributions", () => {
  it("matches PME restauration case at 55 000 $ (Revenu Québec 2026, CNT 0.06 %)", () => {
    const lines = computeQuebecMandatoryContributions(55_000, 275_000, "restaurant");

    expect(lines.find((line) => line.id === "qpp")?.amount).toBe(3244.5);
    expect(lines.find((line) => line.id === "qpip")?.amount).toBe(331.1);
    expect(lines.find((line) => line.id === "ei")?.amount).toBe(1001);
    expect(lines.find((line) => line.id === "hsf")?.amount).toBe(907.5);
    expect(lines.find((line) => line.id === "cnt")?.amount).toBe(33);
    expect(lines.find((line) => line.id === "cnesst")?.amount).toBe(1105.5);

    expect(sumMandatory(lines)).toBe(6622.6);
    expect(sumMandatory(lines) / 55_000).toBeCloseTo(0.1204, 4);
  });

  it("matches cadre TI at 95 000 $ with RRQ2 and AE plafonnée", () => {
    const lines = computeQuebecMandatoryContributions(95_000, 850_000, "office");

    expect(lines.find((line) => line.id === "qpp")?.amount).toBe(4479.3);
    expect(lines.find((line) => line.id === "qpp2")?.amount).toBe(416);
    expect(lines.find((line) => line.id === "qpip")?.amount).toBe(571.9);
    expect(lines.find((line) => line.id === "ei")?.amount).toBe(1253.98);
    expect(lines.find((line) => line.id === "hsf")?.amount).toBe(1567.5);
    expect(lines.find((line) => line.id === "cnt")?.amount).toBe(57);
    expect(lines.find((line) => line.id === "cnesst")?.amount).toBe(750.5);

    expect(sumMandatory(lines)).toBe(9096.18);
    expect(sumMandatory(lines) / 95_000).toBeCloseTo(0.0957, 4);
  });

  it("caps RQAP, AE, CNT and CNESST on high salaries", () => {
    const lines = computeQuebecMandatoryContributions(140_000, 500_000, "office");

    expect(lines.find((line) => line.id === "qpip")?.base).toBe(103_000);
    expect(lines.find((line) => line.id === "ei")?.base).toBe(68_900);
    expect(lines.find((line) => line.id === "cnesst")?.base).toBe(103_000);
    expect(lines.find((line) => line.id === "cnesst")?.amount).toBe(813.7);
    expect(sumMandatory(lines)).toBe(9954.84);
  });

  it("matches bureau employeur case at 60 000 $", () => {
    const lines = computeQuebecMandatoryContributions(60_000, 500_000, "office");

    expect(sumMandatory(lines)).toBe(6512.7);
    expect(sumMandatory(lines) / 60_000).toBeCloseTo(0.1085, 4);
  });

  it("adds RRQ2 only above 74 600 $", () => {
    expect(
      computeQuebecMandatoryContributions(74_600, 500_000).some((line) => line.id === "qpp2")
    ).toBe(false);
    expect(
      computeQuebecMandatoryContributions(80_000, 500_000).find((line) => line.id === "qpp2")
        ?.amount
    ).toBe(216);
  });

  it("returns zero QPP below basic exemption", () => {
    expect(
      computeQuebecMandatoryContributions(3_500, 500_000).find((line) => line.id === "qpp")?.amount
    ).toBe(0);
  });
});

describe("computeQuebecEmployerCost", () => {
  it("adds benefits on top of mandatory DAS", () => {
    const result = computeQuebecEmployerCost({
      grossSalary: 140_000,
      companyTotalPayroll: 500_000,
      cnesstSector: "office",
      benefitsPct: 6,
    });

    expect(result.mandatoryContributions.reduce((sum, line) => sum + line.amount, 0)).toBe(9954.84);
    expect(result.benefitsAmount).toBe(8400);
    expect(result.totalEmployerCost).toBe(158_354.84);
    expect(result.totalLoadPct).toBeCloseTo(13.11, 2);
  });

  it("reflects CNESST sector presets", () => {
    expect(CNESST_SECTOR_RATES.construction).toBe(0.052);
    const construction = computeQuebecEmployerCost({
      grossSalary: 72_000,
      companyTotalPayroll: 672_000,
      cnesstSector: "construction",
      benefitsPct: 0,
    });
    expect(construction.cnesstRate).toBe(0.052);
    expect(construction.mandatoryContributions.find((line) => line.id === "cnesst")?.amount).toBe(
      3744
    );
  });
});

describe("computeHiringFriction", () => {
  it("charges one-time recruitment and models ramp-up only as fewer productive days", () => {
    const friction = computeHiringFriction(150_000, 215, {
      recruitmentCostPct: 15,
      onboardingMonths: 3,
      onboardingProductivityPct: 55,
    });

    expect(friction.recruitmentCost).toBe(22_500);
    expect(friction.onboardingPaidDays).toBe(65);
    expect(friction.onboardingLostDays).toBe(29.2);
    expect(friction.effectiveProductiveDays).toBe(185.8);
    // Ramp-up must never surface as a dollar line (already inside the loaded salary).
    expect((friction as Record<string, unknown>).onboardingCost).toBeUndefined();
  });

  it("returns no onboarding loss at full productivity", () => {
    const friction = computeHiringFriction(100_000, 215, {
      recruitmentCostPct: 0,
      onboardingMonths: 3,
      onboardingProductivityPct: 100,
    });

    expect(friction.recruitmentCost).toBe(0);
    expect(friction.onboardingLostDays).toBe(0);
    expect(friction.effectiveProductiveDays).toBe(215);
  });
});

describe("computeAutonomyOverhead", () => {
  it("values internal coordination time at loaded hourly cost", () => {
    const overhead = computeAutonomyOverhead(158_354.84, {
      coordinationHoursPerWeek: 3,
      employeeToolsAnnualCost: 5_500,
      workplaceAnnualCost: 4_000,
    });

    expect(overhead.coordinationHoursPerWeek).toBe(3);
    expect(overhead.coordinationHourlyCost).toBe(76.13);
    expect(overhead.coordinationAnnualCost).toBe(11_876.28);
    expect(overhead.employeeToolsAnnualCost).toBe(5_500);
    expect(overhead.workplaceAnnualCost).toBe(4_000);
    expect(DEFAULT_COORDINATION_HOURS_PER_WEEK).toBe(2);
  });

  it("drops tools and workplace when their toggles are off", () => {
    const overhead = computeAutonomyOverhead(158_354.84, {
      coordinationHoursPerWeek: 3,
      employeeToolsAnnualCost: 5_500,
      includeEmployeeTools: false,
      workplaceAnnualCost: 4_000,
      includeWorkplace: false,
    });

    expect(overhead.employeeToolsAnnualCost).toBe(0);
    expect(overhead.workplaceAnnualCost).toBe(0);
    expect(overhead.coordinationAnnualCost).toBe(11_876.28);
  });
});

describe("computeDayRateComparison", () => {
  it("uses product manager preset defaults with steady-state and year-1 views", () => {
    const preset = getCalculatorRolePreset("productManager");
    const result = computeDayRateComparison({
      grossSalary: preset.defaultGrossSalary,
      companyTotalPayroll: preset.defaultCompanyPayroll,
      cnesstSector: preset.cnesstSector,
      benefitsPct: preset.defaultBenefitsPct,
      productiveDays: preset.defaultProductiveDays,
      consultantDayRate: preset.defaultConsultantDayRate,
      billedDaysPerWeek: preset.defaultBilledDaysPerWeek,
      recruitmentCostPct: preset.defaultRecruitmentPct,
      onboardingMonths: preset.defaultOnboardingMonths,
      onboardingProductivityPct: preset.defaultOnboardingProductivity,
      coordinationHoursPerWeek: preset.defaultCoordinationHoursPerWeek,
      employeeToolsAnnualCost: preset.defaultEmployeeToolsAnnualCost,
      workplaceAnnualCost: WORKPLACE_ANNUAL_COST[preset.defaultWorkplaceMode],
    });

    expect(result.baseEmployerCost).toBe(159_754.84);
    expect(result.ongoingAnnualCost).toBe(180_737.2);
    expect(result.yearOneAnnualCost).toBe(197_537.2);
    expect(result.steadyStateCostPerDay).toBe(840.64);
    expect(result.yearOneCostPerDay).toBe(1063.17);
    expect(result.effectiveProductiveDays).toBe(185.8);
    expect(result.consultantWeeklyCost).toBe(2200);
    expect(result.consultantAnnualCost).toBe(102_080);
    expect(result.annualSaving).toBe(78_657.2);
    expect(result.hiringFriction?.recruitmentCost).toBe(16_800);
    expect(result.autonomyOverhead?.coordinationAnnualCost).toBe(11_982.36);
    expect(result.autonomyOverhead?.employeeToolsAnnualCost).toBe(5_500);
    expect(result.autonomyOverhead?.workplaceAnnualCost).toBe(3_500);
    expect(result.quebecBreakdown?.year).toBe(2026);
  });

  it("does not double-count ramp-up: year-1 cost excludes an onboarding dollar line", () => {
    const preset = getCalculatorRolePreset("productManager");
    const result = computeDayRateComparison({
      grossSalary: preset.defaultGrossSalary,
      companyTotalPayroll: preset.defaultCompanyPayroll,
      cnesstSector: preset.cnesstSector,
      benefitsPct: preset.defaultBenefitsPct,
      productiveDays: preset.defaultProductiveDays,
      consultantDayRate: preset.defaultConsultantDayRate,
      billedDaysPerWeek: preset.defaultBilledDaysPerWeek,
      recruitmentCostPct: preset.defaultRecruitmentPct,
      onboardingMonths: preset.defaultOnboardingMonths,
      onboardingProductivityPct: preset.defaultOnboardingProductivity,
      coordinationHoursPerWeek: preset.defaultCoordinationHoursPerWeek,
      employeeToolsAnnualCost: preset.defaultEmployeeToolsAnnualCost,
    });

    // Year-1 annual cost is exactly ongoing + one-time recruitment, nothing else.
    expect(result.yearOneAnnualCost).toBe(
      Math.round((result.ongoingAnnualCost + (result.hiringFriction?.recruitmentCost ?? 0)) * 100) /
        100
    );
  });

  it("matches steady-state cost when hiring friction and coordination are disabled", () => {
    const result = computeDayRateComparison({
      grossSalary: 140_000,
      companyTotalPayroll: 500_000,
      benefitsPct: 6,
      productiveDays: 215,
      consultantDayRate: 875,
      billedDaysPerWeek: 3,
      includeHiringFriction: false,
      includeCoordinationOverhead: false,
    });

    expect(result.ongoingAnnualCost).toBe(158_354.84);
    expect(result.steadyStateCostPerDay).toBe(736.53);
    expect(result.yearOneCostPerDay).toBe(736.53);
    expect(result.gapSteadyPerDay).toBe(50.97);
    expect(result.volumeDiscountPct).toBe(10);
    expect(result.effectiveConsultantDayRate).toBe(787.5);
    expect(result.hiringFriction).toBeUndefined();
    expect(result.autonomyOverhead).toBeUndefined();
  });

  it("respects total employer cost mode", () => {
    const result = computeDayRateComparison({
      grossSalary: 170_000,
      isTotalEmployerCost: true,
      productiveDays: 200,
      consultantDayRate: 900,
      billedDaysPerWeek: 2,
      includeHiringFriction: false,
      includeCoordinationOverhead: false,
    });

    expect(result.ongoingAnnualCost).toBe(170_000);
    expect(result.steadyStateCostPerDay).toBe(850);
    expect(result.quebecBreakdown).toBeUndefined();
  });

  it("guards productive days denominator", () => {
    expect(
      computeDayRateComparison({
        grossSalary: 100_000,
        isTotalEmployerCost: true,
        productiveDays: 0,
        includeHiringFriction: false,
        includeCoordinationOverhead: false,
      }).steadyStateCostPerDay
    ).toBe(100_000);
  });

  it("documents productive day defaults used in the UI", () => {
    expect(WORK_DAYS_PER_YEAR).toBe(260);
    expect(DEFAULT_PRODUCTIVE_DAYS).toBe(215);
    expect(PAID_DAYS_PER_WEEK).toBe(5);
    expect(WORK_DAYS_PER_YEAR - DEFAULT_PRODUCTIVE_DAYS).toBe(45);
  });

  it("bills the consultant on 48 working weeks minus 8 Quebec statutory holidays, pro-rated to cadence", () => {
    expect(CONSULTANT_WORKING_WEEKS_PER_YEAR).toBe(48);
    expect(QUEBEC_STAT_HOLIDAYS).toBe(8);
    expect(BILLABLE_WEEKS_PER_YEAR).toBeCloseTo(46.4, 10);

    // A 5 d/wk cadence loses all 8 holidays; a 2 d/wk cadence loses only ~3.2 of them.
    const fullTime = computeDayRateComparison({
      grossSalary: 100_000,
      isTotalEmployerCost: true,
      consultantDayRate: 1000,
      billedDaysPerWeek: 5,
      includeHiringFriction: false,
      includeCoordinationOverhead: false,
    });
    const fractional = computeDayRateComparison({
      grossSalary: 100_000,
      isTotalEmployerCost: true,
      consultantDayRate: 1000,
      billedDaysPerWeek: 2,
      includeHiringFriction: false,
      includeCoordinationOverhead: false,
    });

    // 5 d/wk: 1000 × 5 × 46.4 = 232 000 (240 potential days − 8 holidays = 232).
    expect(fullTime.consultantAnnualCost).toBe(232_000);
    // 2 d/wk: 1000 × 2 × 46.4 = 92 800 (96 potential days − 3.2 holidays = 92.8).
    expect(fractional.consultantAnnualCost).toBe(92_800);
  });

  it("applies a 10% volume discount to the day rate at 3 billed days per week", () => {
    const result = computeDayRateComparison({
      grossSalary: 100_000,
      isTotalEmployerCost: true,
      consultantDayRate: 1_000,
      billedDaysPerWeek: 3,
      includeHiringFriction: false,
      includeCoordinationOverhead: false,
    });

    expect(result.consultantDayRate).toBe(1_000);
    expect(result.volumeDiscountPct).toBe(10);
    expect(result.effectiveConsultantDayRate).toBe(900);
    // 900 × 3 × 46.4 = 125 280
    expect(result.consultantWeeklyCost).toBe(2_700);
    expect(result.consultantAnnualCost).toBe(125_280);
  });

  it("folds variable pay into the DAS gross and ignores it in total-cost mode", () => {
    const shared = {
      companyTotalPayroll: 500_000,
      cnesstSector: "office" as const,
      benefitsPct: 6,
      includeHiringFriction: false,
      includeCoordinationOverhead: false,
    };
    const noBonus = computeDayRateComparison({ grossSalary: 140_000, ...shared });
    const withBonus = computeDayRateComparison({ grossSalary: 140_000, bonusPct: 10, ...shared });

    expect(noBonus.bonusAmount).toBe(0);
    expect(withBonus.bonusAmount).toBe(14_000);
    // At 140k, only FSS is uncapped, so the bonus adds cash + FSS + benefits on the bonus.
    expect(withBonus.baseEmployerCost).toBe(173_425.84);
    expect(withBonus.baseEmployerCost - noBonus.baseEmployerCost).toBeCloseTo(15_071, 2);

    const totalMode = computeDayRateComparison({
      grossSalary: 170_000,
      isTotalEmployerCost: true,
      bonusPct: 15,
      includeHiringFriction: false,
      includeCoordinationOverhead: false,
    });
    expect(totalMode.bonusAmount).toBe(0);
    expect(totalMode.baseEmployerCost).toBe(170_000);
  });

  it("amortizes turnover and severance over average tenure", () => {
    const base = {
      grossSalary: 140_000,
      companyTotalPayroll: 500_000,
      cnesstSector: "office" as const,
      benefitsPct: 6,
      productiveDays: 215,
      consultantDayRate: 1_000,
      billedDaysPerWeek: 3,
      recruitmentCostPct: 15,
      onboardingMonths: 3,
      onboardingProductivityPct: 55,
      coordinationHoursPerWeek: 0,
      includeEmployeeTools: false,
      includeWorkplace: false,
    };
    const off = computeDayRateComparison({
      ...base,
      includeTurnover: false,
      includeSeverance: false,
    });
    const on = computeDayRateComparison({
      ...base,
      includeTurnover: true,
      averageTenureYears: 3,
      includeSeverance: true,
      severanceWeeks: 6,
    });

    const expectedSeverance = Math.round((((140_000 / 52) * 6) / 3) * 100) / 100;

    expect(off.lifecycle).toBeUndefined();
    expect(off.steadyProductiveDays).toBe(215);
    // Recruitment 15% × 140k = 21 000, amortized over 3 years = 7 000/yr.
    expect(on.lifecycle?.amortizedRecruitmentCost).toBe(7_000);
    expect(on.lifecycle?.severanceAnnualCost).toBe(expectedSeverance);
    expect(on.ongoingAnnualCost - off.ongoingAnnualCost).toBeCloseTo(7_000 + expectedSeverance, 2);
    // Ramp-up recurs, so steady-state loses a fraction of the ramp days.
    expect(on.steadyProductiveDays).toBeLessThan(off.steadyProductiveDays);
    // The one-time year-1 spike is unchanged by amortization.
    expect(on.yearOneAnnualCost).toBe(off.yearOneAnnualCost);
  });

  it("keeps turnover inert when hiring friction is excluded", () => {
    const result = computeDayRateComparison({
      grossSalary: 140_000,
      isTotalEmployerCost: true,
      consultantDayRate: 1_000,
      billedDaysPerWeek: 3,
      includeHiringFriction: false,
      includeCoordinationOverhead: false,
      includeTurnover: true,
      includeSeverance: false,
    });

    // No recruitment to amortize, and severance is off: no lifecycle overhead.
    expect(result.lifecycle).toBeUndefined();
    expect(result.ongoingAnnualCost).toBe(140_000);
  });

  it("reports the cadence break-even where the consultant flips to cheaper", () => {
    const base = {
      grossSalary: 200_000,
      isTotalEmployerCost: true,
      consultantDayRate: 1_000,
      includeHiringFriction: false,
      includeCoordinationOverhead: false,
    };
    const atFlip = computeDayRateComparison({ ...base, billedDaysPerWeek: 3 });

    expect(atFlip.employeeAnnualCost).toBe(200_000);
    // 200 000 / (1000 × 46.4) ≈ 4.3 billed days per week.
    expect(atFlip.breakEvenBilledDaysPerWeek).toBeCloseTo(4.3, 1);

    const below = computeDayRateComparison({ ...base, billedDaysPerWeek: 4 });
    const above = computeDayRateComparison({ ...base, billedDaysPerWeek: 5 });
    expect(below.annualSaving).toBeGreaterThan(0);
    expect(above.annualSaving).toBeLessThan(0);
  });
});
