import type { TFunction } from "i18next";

import type { DayRateComparisonResult } from "../../commons/dayRateComparison";
import { BreakdownList, BreakdownSection, type BreakdownListItem } from "./primitives";

interface EmployeeCostBreakdownProps {
  t: TFunction;
  result: DayRateComparisonResult;
  onboardingMonths: number;
  onboardingProductivity: number;
  fmt0: (n: number) => string;
  pct1: (n: number) => string;
}

export function EmployeeCostBreakdown({
  t,
  result,
  onboardingMonths,
  onboardingProductivity,
  fmt0,
  pct1,
}: EmployeeCostBreakdownProps) {
  const breakdown = result.quebecBreakdown;
  const autonomy = result.autonomyOverhead;
  const lifecycle = result.lifecycle;
  const friction = result.hiringFriction;

  const quebecItems: BreakdownListItem[] = [];
  if (breakdown) {
    for (const line of breakdown.mandatoryContributions) {
      quebecItems.push({
        key: line.id,
        label: t(`results.breakdown.lines.${line.id}`),
        value: fmt0(line.amount),
      });
    }
    if (result.bonusAmount > 0) {
      quebecItems.push({
        key: "bonus",
        label: t("results.breakdown.lines.bonus"),
        value: fmt0(result.bonusAmount),
      });
    }
    quebecItems.push({
      key: "benefits",
      label: t("results.breakdown.lines.benefits"),
      value: fmt0(breakdown.benefitsAmount),
    });
    quebecItems.push({
      key: "loaded-total",
      label: t("results.breakdown.loadedTotal"),
      value: fmt0(result.baseEmployerCost),
      tone: "total",
    });
  }

  const recurringItems: BreakdownListItem[] = [];
  if (autonomy) {
    if (autonomy.coordinationAnnualCost > 0) {
      recurringItems.push({
        key: "coordination",
        label: t("results.recurring.coordination"),
        value: fmt0(autonomy.coordinationAnnualCost),
      });
    }
    if (autonomy.employeeToolsAnnualCost > 0) {
      recurringItems.push({
        key: "tools",
        label: t("results.recurring.tools"),
        value: fmt0(autonomy.employeeToolsAnnualCost),
      });
    }
    if (autonomy.workplaceAnnualCost > 0) {
      recurringItems.push({
        key: "workplace",
        label: t("results.recurring.workplace"),
        value: fmt0(autonomy.workplaceAnnualCost),
      });
    }
    if (recurringItems.length > 0) {
      recurringItems.push({
        key: "consultant-tools",
        label: t("results.recurring.consultantTools"),
        value: t("results.recurring.consultantToolsIncluded"),
        tone: "consultant",
      });
    }
  }

  const lifecycleItems: BreakdownListItem[] = [];
  if (lifecycle) {
    if (lifecycle.amortizedRecruitmentCost > 0) {
      lifecycleItems.push({
        key: "turnover",
        label: t("results.lifecycle.turnover"),
        value: fmt0(lifecycle.amortizedRecruitmentCost),
      });
    }
    if (lifecycle.severanceAnnualCost > 0) {
      lifecycleItems.push({
        key: "severance",
        label: t("results.lifecycle.severance"),
        value: fmt0(lifecycle.severanceAnnualCost),
      });
    }
    if (lifecycleItems.length > 0) {
      lifecycleItems.push({
        key: "consultant-lifecycle",
        label: t("results.lifecycle.consultant"),
        value: t("results.lifecycle.consultantIncluded"),
        tone: "consultant",
      });
    }
  }

  return (
    <details className="cost-calculator__detail">
      <summary className="cost-calculator__detail-summary">{t("results.detailTitle")}</summary>
      <div className="cost-calculator__detail-body">
        {breakdown ? (
          <BreakdownSection title={t("results.breakdown.title", { year: breakdown.year })}>
            <BreakdownList
              items={quebecItems}
              footer={
                <p className="cost-calculator__breakdown-foot">
                  {t("results.breakdown.footnote", {
                    fss: pct1(breakdown.fssRate * 100),
                  })}
                </p>
              }
            />
          </BreakdownSection>
        ) : null}

        {recurringItems.length > 0 && autonomy ? (
          <BreakdownSection title={t("results.recurring.title")}>
            <BreakdownList
              items={recurringItems}
              footer={
                autonomy.coordinationAnnualCost > 0 ? (
                  <p className="cost-calculator__breakdown-foot">
                    {t("results.recurring.autonomyFootnote", {
                      hours: autonomy.coordinationHoursPerWeek,
                      hourly: fmt0(autonomy.coordinationHourlyCost),
                    })}
                  </p>
                ) : null
              }
            />
          </BreakdownSection>
        ) : null}

        {lifecycleItems.length > 0 && lifecycle ? (
          <BreakdownSection title={t("results.lifecycle.title")}>
            <BreakdownList
              items={lifecycleItems}
              footer={
                <p className="cost-calculator__breakdown-foot">
                  {t("results.lifecycle.footnote", {
                    tenure: lifecycle.averageTenureYears,
                    lostDays: lifecycle.amortizedRampLostDays,
                  })}
                </p>
              }
            />
          </BreakdownSection>
        ) : null}

        {friction ? (
          <BreakdownSection title={t("results.yearOne.title")}>
            <BreakdownList
              items={[
                {
                  key: "recruitment",
                  label: t("results.yearOne.recruitment"),
                  value: fmt0(friction.recruitmentCost),
                },
              ]}
              footer={
                <p className="cost-calculator__breakdown-foot">
                  {t("results.yearOne.rampNote", {
                    months: onboardingMonths,
                    productivity: onboardingProductivity,
                    lostDays: friction.onboardingLostDays,
                  })}
                </p>
              }
            />
          </BreakdownSection>
        ) : null}

        <BreakdownSection title={t("results.notes.title")}>
          <p className="cost-calculator__note-text">{t("results.autonomy.text")}</p>
          <p className="cost-calculator__note-text">{t("results.consultantConsiderations.text")}</p>
          <p className="cost-calculator__panel-note cost-calculator__panel-note--muted">
            {t("results.taxes.note")}
          </p>
        </BreakdownSection>
      </div>
    </details>
  );
}
