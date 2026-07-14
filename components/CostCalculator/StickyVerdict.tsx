import classNames from "classnames";
import type { TFunction } from "i18next";

import type { CalculatorVerdict } from "../../commons/costCalculatorVerdict";

interface StickyVerdictProps {
  t: TFunction;
  verdict: CalculatorVerdict;
  billedDaysPerWeek: number;
  equivalentLabel: string;
  consultantAnnualLabel: string;
  employeeAnnualLabel: string;
}

export function StickyVerdict({
  t,
  verdict,
  billedDaysPerWeek,
  equivalentLabel,
  consultantAnnualLabel,
  employeeAnnualLabel,
}: StickyVerdictProps) {
  return (
    <div className="cost-calculator__sticky">
      <div
        className={classNames("cost-calculator__hero", {
          "cost-calculator__hero--win": verdict.consultantWinsAnnual,
          "cost-calculator__hero--parity": verdict.isFocusCeiling,
        })}
      >
        <div className="cost-calculator__hero-kicker">{t("results.verdict.kicker")}</div>
        <p className="cost-calculator__hero-headline">
          {t(verdict.headlineKey, { days: billedDaysPerWeek })}
        </p>
        <p className="cost-calculator__hero-ratio-value">
          {t("results.verdict.hero.ratio", {
            days: billedDaysPerWeek,
            equivalent: equivalentLabel,
          })}
        </p>
        <p className="cost-calculator__hero-ratio-hint">{t(verdict.ratioHintKey)}</p>
        <p className="cost-calculator__hero-proof-detail">
          {t("results.verdict.hero.detail", {
            consultant: consultantAnnualLabel,
            employee: employeeAnnualLabel,
            pct: verdict.engagementSharePct,
          })}
        </p>
      </div>
    </div>
  );
}
