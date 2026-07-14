import { WORKPLACE_ANNUAL_COST, type CalculatorRolePreset } from "./costCalculatorPresets";
import type { DayRateComparisonInput } from "./dayRateComparison";

/**
 * Maps a role preset (+ optional UI overrides) into comparison engine input.
 * Keeps CostCalculator and preset tests from duplicating the field wire-up.
 */
export function buildDayRateComparisonInput(
  preset: CalculatorRolePreset,
  overrides: Partial<DayRateComparisonInput> = {}
): DayRateComparisonInput {
  return {
    grossSalary: preset.defaultGrossSalary,
    companyTotalPayroll: preset.defaultCompanyPayroll,
    cnesstSector: preset.cnesstSector,
    benefitsPct: preset.defaultBenefitsPct,
    bonusPct: preset.defaultBonusPct,
    productiveDays: preset.defaultProductiveDays,
    consultantDayRate: preset.defaultConsultantDayRate,
    billedDaysPerWeek: preset.defaultBilledDaysPerWeek,
    recruitmentCostPct: preset.defaultRecruitmentPct,
    onboardingMonths: preset.defaultOnboardingMonths,
    onboardingProductivityPct: preset.defaultOnboardingProductivity,
    coordinationHoursPerWeek: preset.defaultCoordinationHoursPerWeek,
    employeeToolsAnnualCost: preset.defaultEmployeeToolsAnnualCost,
    workplaceAnnualCost: WORKPLACE_ANNUAL_COST[preset.defaultWorkplaceMode],
    ...overrides,
  };
}
