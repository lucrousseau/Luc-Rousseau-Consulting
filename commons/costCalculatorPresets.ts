import type { CnesstSector } from "./quebecEmployerCost";
import {
  DEFAULT_ONBOARDING_PRODUCTIVITY,
  DEFAULT_COORDINATION_HOURS_PER_WEEK,
  DEFAULT_PRODUCTIVE_DAYS,
  DEFAULT_RECRUITMENT_PCT,
} from "./dayRateComparison";

/** Comparison scenarios: senior developer vs product manager in a tech/product team. */
export type CalculatorRole = "developer" | "productManager";

/**
 * List day rate used in the employee-vs-consultant comparison (both profiles).
 * Volume discount (−10 %) applies separately when the client books 3 d/wk.
 *
 * Full rate card also includes elevated engagements (team lead / short PM) at 1 100 $/day;
 * those are priced outside this calculator. Rescue / high-risk work is assessed case by case.
 */
export const BASE_CONSULTANT_DAY_RATE = 900;

/** Full engagement rate card (reference); calculator always uses the base rate. */
export const CONSULTANT_RATE_TIERS = {
  ongoing: BASE_CONSULTANT_DAY_RATE,
  structural: 1_100,
} as const;

/** Where the employee works, which drives the employer's per-seat workplace cost. */
export type WorkplaceMode = "office" | "hybrid" | "remote";

/**
 * Annual employer workplace cost per seat (Montreal PME, low–median allocation):
 * - office: rent + opex share + desk amort (~4-6k$).
 * - hybrid: hot-desk / partial footprint (~2-3k$).
 * - remote: home-office allowance + intermittent co-working (~0.6-1k$).
 * Consultant: $0, workspace included in the day rate.
 */
export const WORKPLACE_ANNUAL_COST: Record<WorkplaceMode, number> = {
  office: 5_000,
  hybrid: 2_500,
  remote: 800,
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
 * Employer-policy assumptions shared by both profiles (PME Quebec, deliberately
 * low–median so the comparison stays conservative for the employee side).
 * Same company, same benefits plan, same tools budget: only salary and role-specific
 * friction (coordination, ramp-up) differ between dev and PM.
 */
export const SHARED_EMPLOYER_DEFAULTS = {
  companyPayroll: 500_000,
  /** Group benefits often land around 4–6 % of base in SME tech. */
  benefitsPct: 5,
  /** Many SMEs pay little or no guaranteed cash bonus; 5 % is a cautious mid. */
  bonusPct: 5,
  recruitmentPct: DEFAULT_RECRUITMENT_PCT,
  /** Laptop amortized + core SaaS (GitHub/IDE or Figma), not a full toolstack. */
  employeeToolsAnnualCost: 3_500,
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
    // Senior base, Montreal PME: low–median of ~107-130k band (Glassdoor base ~113k).
    defaultGrossSalary: 110_000,
    defaultCompanyPayroll: SHARED_EMPLOYER_DEFAULTS.companyPayroll,
    defaultConsultantDayRate: BASE_CONSULTANT_DAY_RATE,
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
    // Senior PM base, Montreal PME: below big-tech total-comp medians (~128k), not agency highs.
    defaultGrossSalary: 120_000,
    defaultCompanyPayroll: SHARED_EMPLOYER_DEFAULTS.companyPayroll,
    defaultConsultantDayRate: BASE_CONSULTANT_DAY_RATE,
    defaultProductiveDays: SHARED_EMPLOYER_DEFAULTS.productiveDays,
    defaultOnboardingMonths: 2,
    defaultOnboardingProductivity: DEFAULT_ONBOARDING_PRODUCTIVITY,
    defaultCoordinationHoursPerWeek: 2,
    defaultRecruitmentPct: SHARED_EMPLOYER_DEFAULTS.recruitmentPct,
    defaultBenefitsPct: SHARED_EMPLOYER_DEFAULTS.benefitsPct,
    defaultBonusPct: SHARED_EMPLOYER_DEFAULTS.bonusPct,
    defaultBilledDaysPerWeek: SHARED_EMPLOYER_DEFAULTS.billedDaysPerWeek,
    defaultEmployeeToolsAnnualCost: SHARED_EMPLOYER_DEFAULTS.employeeToolsAnnualCost,
    defaultWorkplaceMode: SHARED_EMPLOYER_DEFAULTS.workplaceMode,
  },
};

export const CALCULATOR_ROLES = Object.keys(CALCULATOR_ROLE_PRESETS) as CalculatorRole[];

/** Default mission when visiting `/cout-reel-jour` without a slug. */
export const DEFAULT_CALCULATOR_ROLE: CalculatorRole = "developer";

/** Path slugs for each comparison (`/cout-reel-jour/dev`, `/cout-reel-jour/pm`). */
export const CALCULATOR_ROLE_SLUGS: Record<CalculatorRole, string> = {
  developer: "dev",
  productManager: "pm",
};

export const CALCULATOR_ROLE_SLUG_LIST = Object.values(CALCULATOR_ROLE_SLUGS);

const CALCULATOR_ROLE_ALIASES: Record<string, CalculatorRole> = {
  developer: "developer",
  developpeur: "developer",
  développeur: "developer",
  [CALCULATOR_ROLE_SLUGS.developer]: "developer",
  productmanager: "productManager",
  "product-manager": "productManager",
  product_manager: "productManager",
  [CALCULATOR_ROLE_SLUGS.productManager]: "productManager",
};

/** Parses a path slug (or legacy alias) into a calculator role. */
export function parseCalculatorRoleSlug(
  value: string | string[] | undefined | null
): CalculatorRole | null {
  const raw = Array.isArray(value) ? value[0] : value;
  if (!raw) return null;
  return CALCULATOR_ROLE_ALIASES[raw.trim().toLowerCase()] ?? null;
}

export function calculatorRoleToSlug(role: CalculatorRole): string {
  return CALCULATOR_ROLE_SLUGS[role];
}

export function getCalculatorRolePreset(role: CalculatorRole): CalculatorRolePreset {
  return CALCULATOR_ROLE_PRESETS[role];
}
