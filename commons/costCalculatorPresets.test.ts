import { computeDayRateComparison } from "./dayRateComparison";
import {
  BASE_CONSULTANT_DAY_RATE,
  CALCULATOR_ROLES,
  CONSULTANT_RATE_TIERS,
  DEFAULT_CALCULATOR_ROLE,
  SHARED_EMPLOYER_DEFAULTS,
  WORKPLACE_ANNUAL_COST,
  WORKPLACE_MODE_LIST,
  calculatorRoleToSlug,
  getCalculatorRolePreset,
  getWorkplaceMode,
  parseCalculatorRoleSlug,
  type CalculatorRole,
} from "./costCalculatorPresets";

describe("costCalculatorPresets", () => {
  it("exposes developer and product manager scenarios only", () => {
    expect(CALCULATOR_ROLES).toEqual(["developer", "productManager"]);
  });

  it("defaults the base path to the developer mission slug", () => {
    expect(DEFAULT_CALCULATOR_ROLE).toBe("developer");
    expect(calculatorRoleToSlug(DEFAULT_CALCULATOR_ROLE)).toBe("dev");
  });

  it("parses path slugs into calculator roles", () => {
    expect(parseCalculatorRoleSlug("dev")).toBe("developer");
    expect(parseCalculatorRoleSlug("pm")).toBe("productManager");
    expect(parseCalculatorRoleSlug("developer")).toBe("developer");
    expect(parseCalculatorRoleSlug("product-manager")).toBe("productManager");
    expect(parseCalculatorRoleSlug("nope")).toBeNull();
    expect(parseCalculatorRoleSlug(undefined)).toBeNull();
    expect(calculatorRoleToSlug("developer")).toBe("dev");
    expect(calculatorRoleToSlug("productManager")).toBe("pm");
  });

  it.each<CalculatorRole>(["developer", "productManager"])(
    "uses CNESST tech/office rate for %s",
    (role) => {
      expect(getCalculatorRolePreset(role).cnesstSector).toBe("tech");
    }
  );

  it("applies heavier internal load defaults for product manager", () => {
    const developer = getCalculatorRolePreset("developer");
    const productManager = getCalculatorRolePreset("productManager");

    expect(productManager.defaultCoordinationHoursPerWeek).toBeGreaterThan(
      developer.defaultCoordinationHoursPerWeek
    );
    expect(productManager.defaultOnboardingMonths).toBeGreaterThan(
      developer.defaultOnboardingMonths
    );
  });

  it("shares employer-policy defaults across both profiles", () => {
    const developer = getCalculatorRolePreset("developer");
    const productManager = getCalculatorRolePreset("productManager");

    expect(developer.defaultBenefitsPct).toBe(SHARED_EMPLOYER_DEFAULTS.benefitsPct);
    expect(productManager.defaultBenefitsPct).toBe(SHARED_EMPLOYER_DEFAULTS.benefitsPct);
    expect(developer.defaultBonusPct).toBe(SHARED_EMPLOYER_DEFAULTS.bonusPct);
    expect(productManager.defaultBonusPct).toBe(SHARED_EMPLOYER_DEFAULTS.bonusPct);
    expect(developer.defaultRecruitmentPct).toBe(productManager.defaultRecruitmentPct);
    expect(developer.defaultEmployeeToolsAnnualCost).toBe(
      productManager.defaultEmployeeToolsAnnualCost
    );
    expect(developer.defaultWorkplaceMode).toBe(productManager.defaultWorkplaceMode);
    expect(developer.defaultBilledDaysPerWeek).toBe(productManager.defaultBilledDaysPerWeek);
  });

  it("computes higher employee day cost for PM than dev at preset defaults", () => {
    const developer = getCalculatorRolePreset("developer");
    const productManager = getCalculatorRolePreset("productManager");

    const devResult = computeDayRateComparison({
      grossSalary: developer.defaultGrossSalary,
      companyTotalPayroll: developer.defaultCompanyPayroll,
      cnesstSector: developer.cnesstSector,
      benefitsPct: developer.defaultBenefitsPct,
      productiveDays: developer.defaultProductiveDays,
      consultantDayRate: developer.defaultConsultantDayRate,
      billedDaysPerWeek: developer.defaultBilledDaysPerWeek,
      recruitmentCostPct: developer.defaultRecruitmentPct,
      onboardingMonths: developer.defaultOnboardingMonths,
      onboardingProductivityPct: developer.defaultOnboardingProductivity,
      coordinationHoursPerWeek: developer.defaultCoordinationHoursPerWeek,
      employeeToolsAnnualCost: developer.defaultEmployeeToolsAnnualCost,
      workplaceAnnualCost: WORKPLACE_ANNUAL_COST[developer.defaultWorkplaceMode],
    });

    const pmResult = computeDayRateComparison({
      grossSalary: productManager.defaultGrossSalary,
      companyTotalPayroll: productManager.defaultCompanyPayroll,
      cnesstSector: productManager.cnesstSector,
      benefitsPct: productManager.defaultBenefitsPct,
      productiveDays: productManager.defaultProductiveDays,
      consultantDayRate: productManager.defaultConsultantDayRate,
      billedDaysPerWeek: productManager.defaultBilledDaysPerWeek,
      recruitmentCostPct: productManager.defaultRecruitmentPct,
      onboardingMonths: productManager.defaultOnboardingMonths,
      onboardingProductivityPct: productManager.defaultOnboardingProductivity,
      coordinationHoursPerWeek: productManager.defaultCoordinationHoursPerWeek,
      employeeToolsAnnualCost: productManager.defaultEmployeeToolsAnnualCost,
      workplaceAnnualCost: WORKPLACE_ANNUAL_COST[productManager.defaultWorkplaceMode],
    });

    expect(pmResult.steadyStateCostPerDay).toBeGreaterThan(devResult.steadyStateCostPerDay);
    expect(pmResult.yearOneCostPerDay).toBeGreaterThan(devResult.yearOneCostPerDay);
    expect(pmResult.ongoingAnnualCost).toBe(180_737.2);
    expect(devResult.ongoingAnnualCost).toBe(159_630.22);
  });

  it("charges a per-day premium yet stays cheaper on the annual commitment", () => {
    const developer = getCalculatorRolePreset("developer");

    const devResult = computeDayRateComparison({
      grossSalary: developer.defaultGrossSalary,
      companyTotalPayroll: developer.defaultCompanyPayroll,
      cnesstSector: developer.cnesstSector,
      benefitsPct: developer.defaultBenefitsPct,
      productiveDays: developer.defaultProductiveDays,
      consultantDayRate: developer.defaultConsultantDayRate,
      billedDaysPerWeek: developer.defaultBilledDaysPerWeek,
      recruitmentCostPct: developer.defaultRecruitmentPct,
      onboardingMonths: developer.defaultOnboardingMonths,
      onboardingProductivityPct: developer.defaultOnboardingProductivity,
      coordinationHoursPerWeek: developer.defaultCoordinationHoursPerWeek,
      employeeToolsAnnualCost: developer.defaultEmployeeToolsAnnualCost,
      workplaceAnnualCost: WORKPLACE_ANNUAL_COST[developer.defaultWorkplaceMode],
    });

    // The real TJM sits above the loaded per-day cost (senior expertise, no overhead)...
    expect(developer.defaultConsultantDayRate).toBeGreaterThan(devResult.steadyStateCostPerDay);
    // ...but fractional usage still makes the annual commitment cheaper.
    expect(devResult.consultantAnnualCost).toBeLessThan(devResult.employeeAnnualCost);
    expect(devResult.annualSaving).toBeGreaterThan(0);
  });

  it("maps role presets to the fixed base day rate", () => {
    expect(BASE_CONSULTANT_DAY_RATE).toBe(900);
    expect(CONSULTANT_RATE_TIERS).toEqual({ ongoing: 900, structural: 1_100 });
    expect(getCalculatorRolePreset("developer").defaultConsultantDayRate).toBe(
      BASE_CONSULTANT_DAY_RATE
    );
    expect(getCalculatorRolePreset("productManager").defaultConsultantDayRate).toBe(
      BASE_CONSULTANT_DAY_RATE
    );
  });

  it("maps work modes to a per-seat workplace cost", () => {
    expect(WORKPLACE_ANNUAL_COST).toEqual({ office: 6_000, hybrid: 3_500, remote: 1_200 });
    expect(WORKPLACE_MODE_LIST.map((entry) => entry.mode)).toEqual(["office", "hybrid", "remote"]);
    expect(getWorkplaceMode(6_000)).toBe("office");
    expect(getWorkplaceMode(3_500)).toBe("hybrid");
    expect(getWorkplaceMode(1_200)).toBe("remote");
    expect(getWorkplaceMode(9_999)).toBeNull();
    expect(getCalculatorRolePreset("developer").defaultWorkplaceMode).toBe("hybrid");
    expect(getCalculatorRolePreset("productManager").defaultWorkplaceMode).toBe("hybrid");
  });

  it("adds the workplace cost to the employer's recurring commitment", () => {
    const developer = getCalculatorRolePreset("developer");
    const base = {
      grossSalary: developer.defaultGrossSalary,
      companyTotalPayroll: developer.defaultCompanyPayroll,
      cnesstSector: developer.cnesstSector,
      benefitsPct: developer.defaultBenefitsPct,
      productiveDays: developer.defaultProductiveDays,
      consultantDayRate: developer.defaultConsultantDayRate,
      billedDaysPerWeek: developer.defaultBilledDaysPerWeek,
      recruitmentCostPct: developer.defaultRecruitmentPct,
      onboardingMonths: developer.defaultOnboardingMonths,
      onboardingProductivityPct: developer.defaultOnboardingProductivity,
      coordinationHoursPerWeek: developer.defaultCoordinationHoursPerWeek,
      employeeToolsAnnualCost: developer.defaultEmployeeToolsAnnualCost,
    };

    const office = computeDayRateComparison({
      ...base,
      workplaceAnnualCost: WORKPLACE_ANNUAL_COST.office,
    });
    const remote = computeDayRateComparison({
      ...base,
      workplaceAnnualCost: WORKPLACE_ANNUAL_COST.remote,
    });
    const off = computeDayRateComparison({ ...base, includeWorkplace: false });

    expect(off.autonomyOverhead?.workplaceAnnualCost).toBe(0);
    expect(office.autonomyOverhead?.workplaceAnnualCost).toBe(6_000);
    expect(remote.autonomyOverhead?.workplaceAnnualCost).toBe(1_200);
    // Office footprint costs more than remote, all else equal.
    expect(office.ongoingAnnualCost - remote.ongoingAnnualCost).toBeCloseTo(4_800, 2);
    expect(office.ongoingAnnualCost - off.ongoingAnnualCost).toBeCloseTo(6_000, 2);
  });
});
