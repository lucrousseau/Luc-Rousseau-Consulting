import { consultantWeeklyEquivalentDays } from "./costCalculatorYield";

export type CalculatorVerdictTone = "ideal" | "ceiling" | "hire";

export interface ResolveCalculatorVerdictInput {
  billedDaysPerWeek: number;
  annualSaving: number;
  consultantAnnualCost: number;
  employeeAnnualCost: number;
}

export interface CalculatorVerdict {
  tone: CalculatorVerdictTone;
  consultantWinsAnnual: boolean;
  cadenceIdeal: boolean;
  isFocusCeiling: boolean;
  engagementSharePct: number;
  weeklyEquivalentDays: number;
  headlineKey: `results.verdict.${CalculatorVerdictTone}.headline`;
  ratioHintKey: "results.verdict.hero.ratioHint" | "results.verdict.hero.ratioHintCeiling";
}

/**
 * Sticky verdict policy for the marketing calculator.
 * Pure rules on top of cost results; not payroll math.
 */
export function resolveCalculatorVerdict({
  billedDaysPerWeek,
  annualSaving,
  consultantAnnualCost,
  employeeAnnualCost,
}: ResolveCalculatorVerdictInput): CalculatorVerdict {
  const consultantWinsAnnual = annualSaving >= 0;
  const cadenceIdeal = billedDaysPerWeek <= 2;
  const tone: CalculatorVerdictTone = consultantWinsAnnual
    ? cadenceIdeal
      ? "ideal"
      : "ceiling"
    : "hire";
  const isFocusCeiling = tone === "ceiling";

  return {
    tone,
    consultantWinsAnnual,
    cadenceIdeal,
    isFocusCeiling,
    engagementSharePct:
      employeeAnnualCost > 0 ? Math.round((consultantAnnualCost / employeeAnnualCost) * 100) : 0,
    weeklyEquivalentDays: consultantWeeklyEquivalentDays(billedDaysPerWeek),
    headlineKey: `results.verdict.${tone}.headline`,
    ratioHintKey: isFocusCeiling
      ? "results.verdict.hero.ratioHintCeiling"
      : "results.verdict.hero.ratioHint",
  };
}
