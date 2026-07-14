import {
  BILLABLE_WEEKS_PER_YEAR,
  WORK_DAYS_PER_MONTH,
  WORK_DAYS_PER_YEAR,
  WORK_WEEKS_PER_YEAR,
  applyConsultantVolumeDiscount,
  computeAutonomyOverhead,
  computeDayRateComparison,
  computeHiringFriction,
} from "./dayRateComparison";

/**
 * Exhaustive conditional coverage for the day-rate comparison engine:
 * each UI toggle must change only the outputs it owns.
 */
describe("dayRateComparison conditional options", () => {
  const bareSeat = {
    grossSalary: 100_000,
    isTotalEmployerCost: true as const,
    productiveDays: 215,
    consultantDayRate: 900,
    billedDaysPerWeek: 2,
    includeHiringFriction: false,
    includeCoordinationOverhead: false,
    includeEmployeeTools: false,
    includeWorkplace: false,
    includeTurnover: false,
    includeSeverance: false,
  };

  it("bare seat: annuals and per-day depend only on loaded cost and productive days", () => {
    const r = computeDayRateComparison(bareSeat);

    expect(r.baseEmployerCost).toBe(100_000);
    expect(r.ongoingAnnualCost).toBe(100_000);
    expect(r.yearOneAnnualCost).toBe(100_000);
    expect(r.steadyStateCostPerDay).toBeCloseTo(100_000 / 215, 2);
    expect(r.yearOneCostPerDay).toBe(r.steadyStateCostPerDay);
    expect(r.consultantAnnualCost).toBe(900 * 2 * BILLABLE_WEEKS_PER_YEAR);
    expect(r.hiringFriction).toBeUndefined();
    expect(r.autonomyOverhead).toBeUndefined();
    expect(r.lifecycle).toBeUndefined();
  });

  it("year-1 adds full recruitment and reduces productive days without changing cruise when turnover is off", () => {
    const off = computeDayRateComparison({ ...bareSeat, includeHiringFriction: false });
    const on = computeDayRateComparison({
      ...bareSeat,
      includeHiringFriction: true,
      recruitmentCostPct: 10,
      onboardingMonths: 2,
      onboardingProductivityPct: 60,
    });

    expect(on.hiringFriction?.recruitmentCost).toBe(10_000);
    expect(on.yearOneAnnualCost).toBe(off.ongoingAnnualCost + 10_000);
    expect(on.ongoingAnnualCost).toBe(off.ongoingAnnualCost);
    expect(on.steadyStateCostPerDay).toBe(off.steadyStateCostPerDay);

    const paidDays = 2 * WORK_DAYS_PER_MONTH;
    const lostDays = Math.round(paidDays * 0.4 * 10) / 10;
    expect(on.hiringFriction?.onboardingLostDays).toBe(lostDays);
    expect(on.effectiveProductiveDays).toBe(Math.round((215 - lostDays) * 10) / 10);
    expect(on.yearOneCostPerDay).toBeCloseTo(on.yearOneAnnualCost / on.effectiveProductiveDays, 2);
  });

  it("turnover amortizes recruitment and ramp into cruise without changing the year-1 spike", () => {
    const base = {
      ...bareSeat,
      includeHiringFriction: true,
      recruitmentCostPct: 15,
      onboardingMonths: 3,
      onboardingProductivityPct: 55,
    };
    const off = computeDayRateComparison({ ...base, includeTurnover: false });
    const on = computeDayRateComparison({
      ...base,
      includeTurnover: true,
      averageTenureYears: 3,
    });

    expect(on.lifecycle?.amortizedRecruitmentCost).toBe(5_000); // 15k / 3
    expect(on.yearOneAnnualCost).toBe(off.yearOneAnnualCost);
    expect(on.ongoingAnnualCost).toBe(off.ongoingAnnualCost + 5_000);
    expect(on.steadyProductiveDays).toBeLessThan(off.steadyProductiveDays);
  });

  it("severance amortizes over tenure from base salary and is independent of year-1", () => {
    const off = computeDayRateComparison({
      ...bareSeat,
      includeSeverance: false,
    });
    const on = computeDayRateComparison({
      ...bareSeat,
      includeSeverance: true,
      severanceWeeks: 6,
      averageTenureYears: 3,
    });

    const expected = Math.round((((100_000 / WORK_WEEKS_PER_YEAR) * 6) / 3) * 100) / 100;
    expect(on.lifecycle?.severanceAnnualCost).toBe(expected);
    expect(on.ongoingAnnualCost - off.ongoingAnnualCost).toBeCloseTo(expected, 2);
    expect(on.yearOneAnnualCost - off.yearOneAnnualCost).toBe(0);
  });

  it("coordination hours alone add loaded hourly cost × weeks; tools and workplace stay zero", () => {
    const r = computeDayRateComparison({
      ...bareSeat,
      includeCoordinationOverhead: true,
      coordinationHoursPerWeek: 2,
      includeEmployeeTools: false,
      includeWorkplace: false,
    });

    const hourly = Math.round((100_000 / WORK_DAYS_PER_YEAR / 8) * 100) / 100;
    const annual = Math.round(2 * WORK_WEEKS_PER_YEAR * hourly * 100) / 100;
    expect(r.autonomyOverhead?.coordinationHourlyCost).toBe(hourly);
    expect(r.autonomyOverhead?.coordinationAnnualCost).toBe(annual);
    expect(r.autonomyOverhead?.employeeToolsAnnualCost).toBe(0);
    expect(r.autonomyOverhead?.workplaceAnnualCost).toBe(0);
    expect(r.ongoingAnnualCost).toBe(100_000 + annual);
  });

  it("tools and workplace stay billed when coordination is unchecked", () => {
    const r = computeDayRateComparison({
      ...bareSeat,
      includeCoordinationOverhead: false,
      includeEmployeeTools: true,
      employeeToolsAnnualCost: 3_500,
      includeWorkplace: true,
      workplaceAnnualCost: 2_500,
    });

    expect(r.autonomyOverhead?.coordinationAnnualCost).toBe(0);
    expect(r.autonomyOverhead?.employeeToolsAnnualCost).toBe(3_500);
    expect(r.autonomyOverhead?.workplaceAnnualCost).toBe(2_500);
    expect(r.ongoingAnnualCost).toBe(106_000);
  });

  it("each overhead toggle is additive and reversible", () => {
    const none = computeDayRateComparison(bareSeat);
    const tools = computeDayRateComparison({
      ...bareSeat,
      includeEmployeeTools: true,
      employeeToolsAnnualCost: 4_000,
    });
    const workplace = computeDayRateComparison({
      ...bareSeat,
      includeWorkplace: true,
      workplaceAnnualCost: 5_000,
    });
    const both = computeDayRateComparison({
      ...bareSeat,
      includeEmployeeTools: true,
      employeeToolsAnnualCost: 4_000,
      includeWorkplace: true,
      workplaceAnnualCost: 5_000,
    });

    expect(tools.ongoingAnnualCost - none.ongoingAnnualCost).toBe(4_000);
    expect(workplace.ongoingAnnualCost - none.ongoingAnnualCost).toBe(5_000);
    expect(both.ongoingAnnualCost - none.ongoingAnnualCost).toBe(9_000);
  });

  it("volume discount applies only at exactly 3 billed days", () => {
    expect(applyConsultantVolumeDiscount(900, 2)).toEqual({
      effectiveDayRate: 900,
      volumeDiscountPct: 0,
    });
    expect(applyConsultantVolumeDiscount(900, 3)).toEqual({
      effectiveDayRate: 810,
      volumeDiscountPct: 10,
    });

    const at2 = computeDayRateComparison({ ...bareSeat, billedDaysPerWeek: 2 });
    const at3 = computeDayRateComparison({ ...bareSeat, billedDaysPerWeek: 3 });
    expect(at2.consultantAnnualCost).toBe(900 * 2 * BILLABLE_WEEKS_PER_YEAR);
    expect(at3.consultantAnnualCost).toBe(810 * 3 * BILLABLE_WEEKS_PER_YEAR);
  });

  it("bonus folds into DAS gross in salary mode and is ignored in total-cost mode", () => {
    const withBonus = computeDayRateComparison({
      grossSalary: 100_000,
      bonusPct: 10,
      companyTotalPayroll: 500_000,
      cnesstSector: "office",
      benefitsPct: 0,
      productiveDays: 215,
      includeHiringFriction: false,
      includeCoordinationOverhead: false,
      includeEmployeeTools: false,
      includeWorkplace: false,
      includeTurnover: false,
      includeSeverance: false,
      consultantDayRate: 900,
      billedDaysPerWeek: 2,
    });
    const totalMode = computeDayRateComparison({
      ...bareSeat,
      bonusPct: 10,
    });

    expect(withBonus.bonusAmount).toBe(10_000);
    expect(withBonus.quebecBreakdown?.grossSalary).toBe(110_000);
    expect(totalMode.bonusAmount).toBe(0);
    expect(totalMode.baseEmployerCost).toBe(100_000);
  });

  it("hiring friction math matches computeHiringFriction directly", () => {
    const friction = computeHiringFriction(120_000, 215, {
      recruitmentCostPct: 12,
      onboardingMonths: 2,
      onboardingProductivityPct: 50,
    });
    expect(friction.recruitmentCost).toBe(14_400);
    expect(friction.onboardingPaidDays).toBe(Math.round(2 * WORK_DAYS_PER_MONTH * 10) / 10);
    expect(friction.onboardingLostDays).toBe(
      Math.round(friction.onboardingPaidDays * 0.5 * 10) / 10
    );
  });

  it("autonomy hourly cost is loaded cost ÷ productive work-year hours", () => {
    const a = computeAutonomyOverhead(160_000, {
      coordinationHoursPerWeek: 1,
      includeEmployeeTools: false,
      includeWorkplace: false,
    });
    expect(a.coordinationHourlyCost).toBe(
      Math.round((160_000 / WORK_DAYS_PER_YEAR / 8) * 100) / 100
    );
  });
});
