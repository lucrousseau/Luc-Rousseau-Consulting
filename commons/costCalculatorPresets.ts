import type { CnesstSector } from "./quebecEmployerCost";
import {
  DEFAULT_ONBOARDING_PRODUCTIVITY,
  DEFAULT_COORDINATION_HOURS_PER_WEEK,
  DEFAULT_PRODUCTIVE_DAYS,
  DEFAULT_RECRUITMENT_PCT,
} from "./dayRateComparison";

/** Comparison scenarios: senior developer vs product manager in a tech/product team. */
export type CalculatorRole = "developer" | "productManager";

/** Consultant day-rate tiers by engagement type (Luc's real grid). */
export type ConsultantRateTier = "ongoing" | "structural" | "turnaround";

/**
 * Day rate scales with the mandate, not just the role:
 * - ongoing: dev or simple PO/PM, long-term.
 * - structural: short temporary PM mandate (3 or 6 months), known upfront it will not extend.
 * - turnaround: stabilization / rescue PM mandate (highest stakes and urgency).
 */
export const CONSULTANT_RATE_TIERS: Record<ConsultantRateTier, number> = {
  ongoing: 900,
  structural: 1_100,
  turnaround: 1_300,
};

export const CONSULTANT_RATE_TIER_ORDER: ConsultantRateTier[] = [
  "ongoing",
  "structural",
  "turnaround",
];

/** Display-ready tier list (tier id + rate) to iterate without computed member access. */
export const CONSULTANT_RATE_TIER_LIST: ReadonlyArray<{ tier: ConsultantRateTier; rate: number }> =
  [
    { tier: "ongoing", rate: CONSULTANT_RATE_TIERS.ongoing },
    { tier: "structural", rate: CONSULTANT_RATE_TIERS.structural },
    { tier: "turnaround", rate: CONSULTANT_RATE_TIERS.turnaround },
  ];

/** Returns the tier whose rate exactly matches the given day rate, if any. */
export function getConsultantRateTier(dayRate: number): ConsultantRateTier | null {
  return CONSULTANT_RATE_TIER_ORDER.find((tier) => CONSULTANT_RATE_TIERS[tier] === dayRate) ?? null;
}

/** Where the employee works, which drives the employer's per-seat workplace cost. */
export type WorkplaceMode = "office" | "hybrid" | "remote";

/**
 * Annual employer workplace cost per seat (Montreal 2026, allocated per employee):
 * - office: rent + operating costs + desk/furniture amortized + utilities (~4-8k$).
 * - hybrid: partial footprint, shared desks, some home-office support.
 * - remote: home-office setup amortized + internet/phone allowance + occasional co-working.
 * Consultant: $0, their workspace is included in the day rate.
 */
export const WORKPLACE_ANNUAL_COST: Record<WorkplaceMode, number> = {
  office: 6_000,
  hybrid: 3_500,
  remote: 1_200,
};

/** Display-ready mode list (mode id + annual cost) to iterate without computed member access. */
export const WORKPLACE_MODE_LIST: ReadonlyArray<{ mode: WorkplaceMode; cost: number }> = [
  { mode: "office", cost: WORKPLACE_ANNUAL_COST.office },
  { mode: "hybrid", cost: WORKPLACE_ANNUAL_COST.hybrid },
  { mode: "remote", cost: WORKPLACE_ANNUAL_COST.remote },
];

/** Returns the work mode whose default cost exactly matches the given amount, if any. */
export function getWorkplaceMode(cost: number): WorkplaceMode | null {
  return WORKPLACE_MODE_LIST.find((entry) => entry.cost === cost)?.mode ?? null;
}

/**
 * Employer-policy assumptions shared by both profiles.
 * Same company, same benefits plan, same tools budget: only salary and role-specific
 * friction (coordination, ramp-up) differ between dev and PM.
 */
export const SHARED_EMPLOYER_DEFAULTS = {
  companyPayroll: 500_000,
  benefitsPct: 7,
  bonusPct: 10,
  recruitmentPct: DEFAULT_RECRUITMENT_PCT,
  employeeToolsAnnualCost: 5_500,
  workplaceMode: "hybrid" as WorkplaceMode,
  billedDaysPerWeek: 2,
  productiveDays: DEFAULT_PRODUCTIVE_DAYS,
} as const;

export interface CalculatorRolePreset {
  id: CalculatorRole;
  /** Both roles use CNESST bureau / services TI (0,79 %). */
  cnesstSector: CnesstSector;
  defaultGrossSalary: number;
  defaultCompanyPayroll: number;
  defaultConsultantDayRate: number;
  defaultProductiveDays: number;
  defaultOnboardingMonths: number;
  defaultOnboardingProductivity: number;
  defaultCoordinationHoursPerWeek: number;
  defaultRecruitmentPct: number;
  defaultBenefitsPct: number;
  /** Variable pay (bonus) as % of base salary, typical for the role. */
  defaultBonusPct: number;
  defaultBilledDaysPerWeek: number;
  /** Laptop amortized + software licenses paid by employer (annual). */
  defaultEmployeeToolsAnnualCost: number;
  /** Where the employee works, driving the default per-seat workplace cost. */
  defaultWorkplaceMode: WorkplaceMode;
}

export const CALCULATOR_ROLE_PRESETS: Record<CalculatorRole, CalculatorRolePreset> = {
  developer: {
    id: "developer",
    cnesstSector: "tech",
    // Senior dev median base, Montreal 2026 (Levels/PayScale ~107-130k, Robert Half higher).
    defaultGrossSalary: 125_000,
    defaultCompanyPayroll: SHARED_EMPLOYER_DEFAULTS.companyPayroll,
    defaultConsultantDayRate: CONSULTANT_RATE_TIERS.ongoing,
    defaultProductiveDays: SHARED_EMPLOYER_DEFAULTS.productiveDays,
    defaultOnboardingMonths: 2,
    defaultOnboardingProductivity: DEFAULT_ONBOARDING_PRODUCTIVITY,
    defaultCoordinationHoursPerWeek: DEFAULT_COORDINATION_HOURS_PER_WEEK,
    defaultRecruitmentPct: SHARED_EMPLOYER_DEFAULTS.recruitmentPct,
    defaultBenefitsPct: SHARED_EMPLOYER_DEFAULTS.benefitsPct,
    defaultBonusPct: SHARED_EMPLOYER_DEFAULTS.bonusPct,
    defaultBilledDaysPerWeek: SHARED_EMPLOYER_DEFAULTS.billedDaysPerWeek,
    defaultEmployeeToolsAnnualCost: SHARED_EMPLOYER_DEFAULTS.employeeToolsAnnualCost,
    defaultWorkplaceMode: SHARED_EMPLOYER_DEFAULTS.workplaceMode,
  },
  productManager: {
    id: "productManager",
    cnesstSector: "tech",
    // Senior PM median base, Montreal 2026 (Levels total comp ~128k, job postings ~146k).
    defaultGrossSalary: 140_000,
    defaultCompanyPayroll: SHARED_EMPLOYER_DEFAULTS.companyPayroll,
    defaultConsultantDayRate: CONSULTANT_RATE_TIERS.structural,
    defaultProductiveDays: SHARED_EMPLOYER_DEFAULTS.productiveDays,
    defaultOnboardingMonths: 3,
    defaultOnboardingProductivity: 55,
    defaultCoordinationHoursPerWeek: 3,
    defaultRecruitmentPct: SHARED_EMPLOYER_DEFAULTS.recruitmentPct,
    defaultBenefitsPct: SHARED_EMPLOYER_DEFAULTS.benefitsPct,
    defaultBonusPct: SHARED_EMPLOYER_DEFAULTS.bonusPct,
    defaultBilledDaysPerWeek: SHARED_EMPLOYER_DEFAULTS.billedDaysPerWeek,
    defaultEmployeeToolsAnnualCost: SHARED_EMPLOYER_DEFAULTS.employeeToolsAnnualCost,
    defaultWorkplaceMode: SHARED_EMPLOYER_DEFAULTS.workplaceMode,
  },
};

export const CALCULATOR_ROLES = Object.keys(CALCULATOR_ROLE_PRESETS) as CalculatorRole[];

export function getCalculatorRolePreset(role: CalculatorRole): CalculatorRolePreset {
  return CALCULATOR_ROLE_PRESETS[role];
}
