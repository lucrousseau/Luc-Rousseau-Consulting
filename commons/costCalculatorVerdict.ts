import { BILLABLE_WEEKS_PER_YEAR } from "./dayRateComparison";
import { consultantDayValueRatio, consultantWeeklyEquivalentDays } from "./costCalculatorYield";

export type CalculatorVerdictTone = "ideal" | "ceiling" | "hire";

export interface ResolveCalculatorVerdictInput {
  billedDaysPerWeek: number;
  consultantAnnualCost: number;
  /** Effective TJM after volume discount. */
  effectiveConsultantDayRate: number;
  /** CDI loaded cost per day in year 1 (recruitment + ramp-up). */
  yearOneCostPerDay: number;
}

export interface CalculatorVerdict {
  tone: CalculatorVerdictTone;
  /**
   * True when TJM ≤ year-1 CDI $/j × scoped day-value ratio
   * (e.g. 900 ≤ 701 × 1.5 at 1 d/wk).
   */
  consultantWinsOnYield: boolean;
  cadenceIdeal: boolean;
  isFocusCeiling: boolean;
  engagementSharePct: number;
  weeklyEquivalentDays: number;
  /** Year-1 CDI $/j × yield days × billable weeks (same cadence as the mandate). */
  yieldEquivalentCdiAnnual: number;
  headlineKey: `results.verdict.${CalculatorVerdictTone}.headline`;
}

/**
 * Sticky verdict policy for the marketing calculator.
 * Pure rules on top of cost results; not payroll math.
 * Over-budget and proof line both use year-1 CDI day cost × yield ratio.
 */
export function resolveCalculatorVerdict({
  billedDaysPerWeek,
  consultantAnnualCost,
  effectiveConsultantDayRate,
  yearOneCostPerDay,
}: ResolveCalculatorVerdictInput): CalculatorVerdict {
  const weeklyEquivalentDays = consultantWeeklyEquivalentDays(billedDaysPerWeek);
  const dayValueRatio = consultantDayValueRatio(billedDaysPerWeek);
  const yieldAdjustedCdiDayCost = yearOneCostPerDay * dayValueRatio;
  const yieldEquivalentCdiAnnual = Math.round(
    yearOneCostPerDay * weeklyEquivalentDays * BILLABLE_WEEKS_PER_YEAR
  );
  const consultantWinsOnYield =
    yieldAdjustedCdiDayCost > 0 && effectiveConsultantDayRate <= yieldAdjustedCdiDayCost;
  const cadenceIdeal = billedDaysPerWeek <= 2;
  const tone: CalculatorVerdictTone = consultantWinsOnYield
    ? cadenceIdeal
      ? "ideal"
      : "ceiling"
    : "hire";

  return {
    tone,
    consultantWinsOnYield,
    cadenceIdeal,
    isFocusCeiling: tone === "ceiling",
    engagementSharePct:
      yieldEquivalentCdiAnnual > 0
        ? Math.round((consultantAnnualCost / yieldEquivalentCdiAnnual) * 100)
        : 0,
    weeklyEquivalentDays,
    yieldEquivalentCdiAnnual,
    headlineKey: `results.verdict.${tone}.headline`,
  };
}
