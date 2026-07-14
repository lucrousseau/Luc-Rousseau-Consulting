import {
  computeQuebecEmployerCost,
  type CnesstSector,
  type QuebecEmployerCostResult,
} from "./quebecEmployerCost";

export const DEFAULT_PRODUCTIVE_DAYS = 215;
export const WORK_DAYS_PER_YEAR = 260;
export const WORK_WEEKS_PER_YEAR = 52;
export const PAID_DAYS_PER_WEEK = 5;
export const WORK_DAYS_PER_MONTH = WORK_DAYS_PER_YEAR / 12;
/** Consultant vacation weeks taken each year (continuous 12-month mandate). */
export const CONSULTANT_VACATION_WEEKS_PER_YEAR = 4;
/** Consultant working weeks per year after vacation (52 − 4). */
export const CONSULTANT_WORKING_WEEKS_PER_YEAR =
  WORK_WEEKS_PER_YEAR - CONSULTANT_VACATION_WEEKS_PER_YEAR;
/** Quebec statutory holidays (Loi sur les normes du travail + Fête nationale). */
export const QUEBEC_STAT_HOLIDAYS = 8;
/**
 * Effective consultant billable weeks on a continuous 12-month mandate:
 * working weeks minus Quebec statutory holidays, pro-rated to a 5-day week
 * (48 − 8/5 = 46.4). This averages the uncertainty that a holiday may or may
 * not fall on a billed client day at a fractional cadence.
 */
export const BILLABLE_WEEKS_PER_YEAR =
  CONSULTANT_WORKING_WEEKS_PER_YEAR - QUEBEC_STAT_HOLIDAYS / PAID_DAYS_PER_WEEK;
/** Billed days/week that trigger Luc's volume discount. */
export const VOLUME_DISCOUNT_BILLED_DAYS = 3;
/** Volume discount applied to the day rate at {@link VOLUME_DISCOUNT_BILLED_DAYS}. */
export const VOLUME_DISCOUNT_PCT = 10;

/** Typical all-in recruitment cost for a senior profile, amortized over year 1 (% of gross). */
export const DEFAULT_RECRUITMENT_PCT = 12;
/** Paid ramp-up period before full productivity (months). */
export const DEFAULT_ONBOARDING_MONTHS = 3;
/** Productivity during onboarding (0–100). 60 % ≈ paid full time, output at 60 %. */
export const DEFAULT_ONBOARDING_PRODUCTIVITY = 60;
/** Manager/team hours per week to supervise and align an employee (consultant: ~0). */
export const DEFAULT_COORDINATION_HOURS_PER_WEEK = 2;
/** Average employee tenure in tech (years); hiring and ramp-up recur on this cadence. */
export const DEFAULT_AVERAGE_TENURE_YEARS = 3;
/** Expected severance/notice at departure (weeks of base pay), amortized over tenure. */
export const DEFAULT_SEVERANCE_WEEKS = 4;
const HOURS_PER_WORK_DAY = 8;

export interface HiringFrictionInput {
  recruitmentCostPct?: number;
  onboardingMonths?: number;
  onboardingProductivityPct?: number;
  includeHiringFriction?: boolean;
}

export interface AutonomyOverheadInput {
  includeCoordinationOverhead?: boolean;
  coordinationHoursPerWeek?: number;
  includeEmployeeTools?: boolean;
  employeeToolsAnnualCost?: number;
  includeWorkplace?: boolean;
  workplaceAnnualCost?: number;
}

export interface HiringFrictionResult {
  /** One-time recruitment cost, charged in year 1 only. */
  recruitmentCost: number;
  onboardingPaidDays: number;
  /** Productive days lost to ramp-up (already captured as a smaller denominator, never as $). */
  onboardingLostDays: number;
  effectiveProductiveDays: number;
}

export interface AutonomyOverheadResult {
  coordinationHoursPerWeek: number;
  coordinationHourlyCost: number;
  /** Recurring annual internal coordination cost (manager/team/HR time). */
  coordinationAnnualCost: number;
  /** Recurring annual employer-paid tools and equipment. */
  employeeToolsAnnualCost: number;
  /** Recurring annual employer-paid workplace cost (office space or WFH allowance). */
  workplaceAnnualCost: number;
}

export interface EmployeeLifecycleInput {
  /** Amortize hiring over average tenure: recruitment and ramp-up recur every ~tenure years. */
  includeTurnover?: boolean;
  averageTenureYears?: number;
  /** Expected severance/notice at departure (weeks of base pay), amortized over tenure. */
  includeSeverance?: boolean;
  severanceWeeks?: number;
}

export interface EmployeeLifecycleResult {
  averageTenureYears: number;
  /** Recruitment cost amortized over tenure (recurring, only when turnover is on). */
  amortizedRecruitmentCost: number;
  /** Ramp-up days lost per year on average once re-hiring is amortized over tenure. */
  amortizedRampLostDays: number;
  severanceWeeks: number;
  /** Expected annual severance/notice cost (amortized over tenure). */
  severanceAnnualCost: number;
}

export interface DayRateComparisonInput
  extends HiringFrictionInput, AutonomyOverheadInput, EmployeeLifecycleInput {
  grossSalary: number;
  /** When true, `grossSalary` is interpreted as total employer cost (loaded). */
  isTotalEmployerCost?: boolean;
  companyTotalPayroll?: number;
  cnesstSector?: CnesstSector;
  benefitsPct?: number;
  /** Variable pay (bonus) as % of base salary; folded into the DAS gross (gross mode only). */
  bonusPct?: number;
  productiveDays?: number;
  consultantDayRate?: number;
  billedDaysPerWeek?: number;
}

export interface DayRateComparisonResult {
  /** Loaded salary only: gross (base + bonus) + mandatory payroll taxes + benefits. */
  baseEmployerCost: number;
  /** Variable pay folded into the loaded cost (0 in total-cost mode). */
  bonusAmount: number;
  /** Recurring annual cost (year 2+): loaded salary + coordination + employer tools. */
  ongoingAnnualCost: number;
  /** Year-1 cash cost: ongoing + one-time recruitment (ramp-up handled as fewer days). */
  yearOneAnnualCost: number;
  /** Ongoing cost divided by full productive days. */
  steadyStateCostPerDay: number;
  /** Year-1 cost divided by ramp-reduced productive days. */
  yearOneCostPerDay: number;
  /** List day rate before volume discount. */
  consultantDayRate: number;
  /** Day rate after volume discount (if any). */
  effectiveConsultantDayRate: number;
  /** Volume discount applied to the day rate (0 or 10). */
  volumeDiscountPct: number;
  /** effectiveConsultant − employee per productive day (positive = consultant costs more/day). */
  gapSteadyPerDay: number;
  gapYearOnePerDay: number;
  /** employee − consultant annual spend (positive = consultant is cheaper per year). */
  annualSaving: number;
  annualSavingRelative: number;
  /** Billed days/week where consultant annual cost equals the employee's (flip point). */
  breakEvenBilledDaysPerWeek: number;
  employeeWeeklyCost: number;
  consultantWeeklyCost: number;
  employeeAnnualCost: number;
  consultantAnnualCost: number;
  productiveDays: number;
  /** Steady-state productive days after amortized ramp-up (lower than productiveDays when turnover is on). */
  steadyProductiveDays: number;
  effectiveProductiveDays: number;
  hiringFriction?: HiringFrictionResult;
  autonomyOverhead?: AutonomyOverheadResult;
  lifecycle?: EmployeeLifecycleResult;
  quebecBreakdown?: QuebecEmployerCostResult;
}

function roundMoney(value: number): number {
  return Math.round(value * 100) / 100;
}

function roundDays(value: number): number {
  return Math.round(value * 10) / 10;
}

/** Applies Luc's volume discount when the client books 3 billed days per week. */
export function applyConsultantVolumeDiscount(
  listDayRate: number,
  billedDaysPerWeek: number
): { effectiveDayRate: number; volumeDiscountPct: number } {
  const volumeDiscountPct =
    billedDaysPerWeek === VOLUME_DISCOUNT_BILLED_DAYS ? VOLUME_DISCOUNT_PCT : 0;
  const effectiveDayRate =
    volumeDiscountPct > 0
      ? roundMoney(listDayRate * (1 - volumeDiscountPct / 100))
      : Math.max(0, listDayRate);
  return { effectiveDayRate, volumeDiscountPct };
}

/**
 * Year-1 hiring friction.
 * - Recruitment is a one-time cost charged in year 1.
 * - Ramp-up is modeled ONLY as fewer productive days (the salary paid during ramp is
 *   already inside the loaded cost, so it must not be double-counted as an extra $ line).
 */
export function computeHiringFriction(
  grossSalary: number,
  productiveDays: number,
  input: HiringFrictionInput = {}
): HiringFrictionResult {
  const recruitmentPct = Math.max(0, input.recruitmentCostPct ?? DEFAULT_RECRUITMENT_PCT);
  const onboardingMonths = Math.max(0, input.onboardingMonths ?? DEFAULT_ONBOARDING_MONTHS);
  const onboardingProductivity = Math.min(
    100,
    Math.max(0, input.onboardingProductivityPct ?? DEFAULT_ONBOARDING_PRODUCTIVITY)
  );

  const recruitmentCost = roundMoney(Math.max(0, grossSalary) * (recruitmentPct / 100));
  const onboardingPaidDays = roundDays(onboardingMonths * WORK_DAYS_PER_MONTH);
  const productivityLossFactor = 1 - onboardingProductivity / 100;
  const onboardingLostDays = roundDays(onboardingPaidDays * productivityLossFactor);
  const effectiveProductiveDays = Math.max(1, roundDays(productiveDays - onboardingLostDays));

  return {
    recruitmentCost,
    onboardingPaidDays,
    onboardingLostDays,
    effectiveProductiveDays,
  };
}

/**
 * Recurring "cost of the organization around the seat" that a self-directed
 * fractional consultant does not require: internal coordination + employer-paid tools.
 */
export function computeAutonomyOverhead(
  loadedEmployerCost: number,
  input: AutonomyOverheadInput = {}
): AutonomyOverheadResult {
  const coordinationHoursPerWeek = Math.max(
    0,
    input.coordinationHoursPerWeek ?? DEFAULT_COORDINATION_HOURS_PER_WEEK
  );
  const coordinationHourlyCost = roundMoney(
    loadedEmployerCost / WORK_DAYS_PER_YEAR / HOURS_PER_WORK_DAY
  );
  const coordinationAnnualCost = roundMoney(
    coordinationHoursPerWeek * WORK_WEEKS_PER_YEAR * coordinationHourlyCost
  );
  const includeEmployeeTools = input.includeEmployeeTools ?? true;
  const employeeToolsAnnualCost = includeEmployeeTools
    ? roundMoney(Math.max(0, input.employeeToolsAnnualCost ?? 0))
    : 0;
  const includeWorkplace = input.includeWorkplace ?? true;
  const workplaceAnnualCost = includeWorkplace
    ? roundMoney(Math.max(0, input.workplaceAnnualCost ?? 0))
    : 0;

  return {
    coordinationHoursPerWeek,
    coordinationHourlyCost,
    coordinationAnnualCost,
    employeeToolsAnnualCost,
    workplaceAnnualCost,
  };
}

export function computeDayRateComparison(input: DayRateComparisonInput): DayRateComparisonResult {
  const productiveDays = Math.max(1, input.productiveDays ?? DEFAULT_PRODUCTIVE_DAYS);
  const consultantDayRate = Math.max(0, input.consultantDayRate ?? 0);
  const billedDaysPerWeek = Math.max(0, input.billedDaysPerWeek ?? 0);
  const { effectiveDayRate: effectiveConsultantDayRate, volumeDiscountPct } =
    applyConsultantVolumeDiscount(consultantDayRate, billedDaysPerWeek);
  const includeHiringFriction = input.includeHiringFriction ?? true;
  const includeCoordinationOverhead = input.includeCoordinationOverhead ?? true;

  const baseSalary = Math.max(0, input.grossSalary);
  // Variable pay is pensionable/insurable income: fold it into the gross used for DAS.
  const bonusPct = input.isTotalEmployerCost ? 0 : Math.max(0, input.bonusPct ?? 0);
  const bonusAmount = roundMoney(baseSalary * (bonusPct / 100));
  const grossForCost = baseSalary + bonusAmount;

  let baseEmployerCost = grossForCost;
  let quebecBreakdown: QuebecEmployerCostResult | undefined;

  if (!input.isTotalEmployerCost) {
    quebecBreakdown = computeQuebecEmployerCost({
      grossSalary: grossForCost,
      companyTotalPayroll: input.companyTotalPayroll,
      cnesstSector: input.cnesstSector,
      benefitsPct: input.benefitsPct,
    });
    baseEmployerCost = quebecBreakdown.totalEmployerCost;
  }

  const hiringFriction = includeHiringFriction
    ? computeHiringFriction(baseSalary, productiveDays, input)
    : undefined;

  const autonomyOverhead = includeCoordinationOverhead
    ? computeAutonomyOverhead(baseEmployerCost, input)
    : undefined;

  const coordinationExtra = autonomyOverhead?.coordinationAnnualCost ?? 0;
  const toolsExtra = autonomyOverhead?.employeeToolsAnnualCost ?? 0;
  const workplaceExtra = autonomyOverhead?.workplaceAnnualCost ?? 0;
  const recruitmentExtra = hiringFriction?.recruitmentCost ?? 0;
  const onboardingLostDays = hiringFriction?.onboardingLostDays ?? 0;

  // Recurring seat cost that repeats every year regardless of tenure.
  const recurringSeatCost = roundMoney(
    baseEmployerCost + coordinationExtra + toolsExtra + workplaceExtra
  );

  // Employee lifecycle: turnover amortizes hiring over tenure; severance is an expected exit cost.
  const includeTurnover = input.includeTurnover ?? false;
  const includeSeverance = input.includeSeverance ?? false;
  const averageTenureYears = Math.max(1, input.averageTenureYears ?? DEFAULT_AVERAGE_TENURE_YEARS);
  const severanceWeeks = Math.max(0, input.severanceWeeks ?? DEFAULT_SEVERANCE_WEEKS);

  // Turnover only has hiring to amortize when hiring friction is modeled.
  const turnoverActive = includeTurnover && includeHiringFriction;
  const amortizedRecruitmentCost = turnoverActive
    ? roundMoney(recruitmentExtra / averageTenureYears)
    : 0;
  const amortizedRampLostDays = turnoverActive
    ? roundDays(onboardingLostDays / averageTenureYears)
    : 0;
  const severanceAnnualCost = includeSeverance
    ? roundMoney(((baseSalary / WORK_WEEKS_PER_YEAR) * severanceWeeks) / averageTenureYears)
    : 0;

  const lifecycle: EmployeeLifecycleResult | undefined =
    turnoverActive || includeSeverance
      ? {
          averageTenureYears,
          amortizedRecruitmentCost,
          amortizedRampLostDays,
          severanceWeeks: includeSeverance ? severanceWeeks : 0,
          severanceAnnualCost,
        }
      : undefined;

  // Long-run recurring cost: seat + amortized re-hiring + expected severance.
  const ongoingAnnualCost = roundMoney(
    recurringSeatCost + amortizedRecruitmentCost + severanceAnnualCost
  );
  // Year 1 spike: seat + the full one-time recruitment (ramp-up handled as fewer days).
  const yearOneAnnualCost = roundMoney(recurringSeatCost + recruitmentExtra);
  const effectiveProductiveDays = hiringFriction?.effectiveProductiveDays ?? productiveDays;
  // Steady state loses only the amortized share of ramp days (re-hire every ~tenure years).
  const steadyProductiveDays = Math.max(1, roundDays(productiveDays - amortizedRampLostDays));

  const steadyStateCostPerDay = roundMoney(ongoingAnnualCost / steadyProductiveDays);
  const yearOneCostPerDay = roundMoney(yearOneAnnualCost / effectiveProductiveDays);

  const gapSteadyPerDay = roundMoney(effectiveConsultantDayRate - steadyStateCostPerDay);
  const gapYearOnePerDay = roundMoney(effectiveConsultantDayRate - yearOneCostPerDay);

  const employeeWeeklyCost = roundMoney(ongoingAnnualCost / WORK_WEEKS_PER_YEAR);
  const consultantWeeklyCost = roundMoney(effectiveConsultantDayRate * billedDaysPerWeek);

  const employeeAnnualCost = ongoingAnnualCost;
  const consultantAnnualCost = roundMoney(
    effectiveConsultantDayRate * billedDaysPerWeek * BILLABLE_WEEKS_PER_YEAR
  );
  const annualSaving = roundMoney(employeeAnnualCost - consultantAnnualCost);
  const annualSavingRelative = employeeAnnualCost > 0 ? annualSaving / employeeAnnualCost : 0;
  // Break-even uses the list rate: the volume discount only applies at exactly 3 d/wk.
  const breakEvenBilledDaysPerWeek =
    consultantDayRate > 0 && BILLABLE_WEEKS_PER_YEAR > 0
      ? roundDays(employeeAnnualCost / (consultantDayRate * BILLABLE_WEEKS_PER_YEAR))
      : 0;

  return {
    baseEmployerCost,
    bonusAmount,
    ongoingAnnualCost,
    yearOneAnnualCost,
    steadyStateCostPerDay,
    yearOneCostPerDay,
    consultantDayRate,
    effectiveConsultantDayRate,
    volumeDiscountPct,
    gapSteadyPerDay,
    gapYearOnePerDay,
    annualSaving,
    annualSavingRelative,
    breakEvenBilledDaysPerWeek,
    employeeWeeklyCost,
    consultantWeeklyCost,
    employeeAnnualCost,
    consultantAnnualCost,
    productiveDays,
    steadyProductiveDays,
    effectiveProductiveDays,
    hiringFriction,
    autonomyOverhead,
    lifecycle,
    quebecBreakdown,
  };
}
