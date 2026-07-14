import {
  GROSS_SALARY_MAX,
  GROSS_SALARY_MIN,
  GROSS_SALARY_STEP,
} from "../../commons/costCalculatorPresets";

/** Named slider bounds for the day-rate calculator inputs. */
export const COST_CALCULATOR_SLIDERS = {
  salary: { min: GROSS_SALARY_MIN, max: GROSS_SALARY_MAX, step: GROSS_SALARY_STEP },
  companyPayroll: { min: 100_000, max: 5_000_000, step: 50_000 },
  benefitsPct: { min: 0, max: 12, step: 1 },
  bonusPct: { min: 0, max: 30, step: 1 },
  productiveDays: { min: 180, max: 260, step: 5 },
  recruitmentPct: { min: 0, max: 25, step: 1 },
  onboardingMonths: { min: 0, max: 6, step: 1 },
  onboardingProductivity: { min: 25, max: 100, step: 5 },
  coordinationHours: { min: 0, max: 8, step: 1 },
  employeeTools: { min: 0, max: 10_000, step: 500 },
  tenureYears: { min: 1, max: 8, step: 1 },
  severanceWeeks: { min: 0, max: 26, step: 1 },
} as const;

export const BILLED_DAYS_OPTIONS = [1, 2, 3] as const;
