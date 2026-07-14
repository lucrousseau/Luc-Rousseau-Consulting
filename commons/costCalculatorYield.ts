/**
 * Marketing / positioning yield table for the day-rate calculator sticky.
 * Deliberately separate from payroll math (`dayRateComparison`) and role presets.
 */

/** Scoped CDI-equivalent days of progress claimed per weekly cadence. */
const SCOPED_WEEKLY_FTE_EQUIVALENT = {
  1: 1.5,
  2: 3,
  3: 5,
} as const;

function clampBilledDays(billedDaysPerWeek: number): 1 | 2 | 3 {
  return Math.min(3, Math.max(1, Math.round(billedDaysPerWeek))) as 1 | 2 | 3;
}

/** Total CDI-equivalent days of scoped progress claimed for the weekly cadence. */
export function consultantWeeklyEquivalentDays(billedDaysPerWeek: number): number {
  return SCOPED_WEEKLY_FTE_EQUIVALENT[clampBilledDays(billedDaysPerWeek)];
}

/**
 * How many diluted full-time days one focused consultant day replaces on scoped work.
 * Example at 3 d/wk: 5 / 3 ≈ 1.7.
 */
export function consultantDayValueRatio(billedDaysPerWeek: number): number {
  const days = clampBilledDays(billedDaysPerWeek);
  return Math.round((SCOPED_WEEKLY_FTE_EQUIVALENT[days] / days) * 10) / 10;
}
