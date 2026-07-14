import classNames from "classnames";
import { useMemo, useState, type ReactNode } from "react";
import { useTranslation } from "next-i18next/pages";
import { useRouter } from "next/router";

import {
  BASE_CONSULTANT_DAY_RATE,
  DEFAULT_CALCULATOR_ROLE,
  GROSS_SALARY_MAX,
  GROSS_SALARY_MIN,
  GROSS_SALARY_STEP,
  WORKPLACE_ANNUAL_COST,
  WORKPLACE_MODE_LIST,
  getCalculatorRolePreset,
  getWorkplaceMode,
  parseGrossSalaryQueryParam,
  type CalculatorRole,
  type WorkplaceMode,
} from "../../commons/costCalculatorPresets";
import { buildDayRateComparisonInput } from "../../commons/buildDayRateComparisonInput";
import { resolveCalculatorVerdict } from "../../commons/costCalculatorVerdict";
import {
  CONSULTANT_WORKING_WEEKS_PER_YEAR,
  CONSULTANT_VACATION_WEEKS_PER_YEAR,
  BILLABLE_WEEKS_PER_YEAR,
  DEFAULT_AVERAGE_TENURE_YEARS,
  DEFAULT_SEVERANCE_WEEKS,
  computeDayRateComparison,
} from "../../commons/dayRateComparison";

function createCurrencyFormatter(locale: string) {
  return new Intl.NumberFormat(locale === "en" ? "en-CA" : "fr-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  });
}

interface FieldProps {
  label: string;
  hint?: string;
  children: ReactNode;
}

function Field({ label, hint, children }: FieldProps) {
  return (
    <div className="cost-calculator__field">
      <div className="cost-calculator__field-head">
        <label className="cost-calculator__field-label">{label}</label>
        {hint && <span className="cost-calculator__field-hint">{hint}</span>}
      </div>
      {children}
    </div>
  );
}

interface BreakdownDetailsProps {
  title: string;
  children: ReactNode;
}

function BreakdownSection({ title, children }: BreakdownDetailsProps) {
  return (
    <section className="cost-calculator__breakdown-section">
      <h4 className="cost-calculator__breakdown-heading">{title}</h4>
      <div className="cost-calculator__breakdown-section-body">{children}</div>
    </section>
  );
}

interface InputSectionProps {
  title: string;
  children: ReactNode;
}

function InputSection({ title, children }: InputSectionProps) {
  return (
    <details className="cost-calculator__input-section">
      <summary className="cost-calculator__input-section-summary">{title}</summary>
      <div className="cost-calculator__input-section-body">{children}</div>
    </details>
  );
}

interface CompareSideProps {
  title: string;
  lede?: string;
  tone: "employee" | "consultant";
  children: ReactNode;
  footer?: ReactNode;
}

function CompareSide({ title, lede, tone, children, footer }: CompareSideProps) {
  return (
    <section
      className={classNames("cost-calculator__side", {
        "cost-calculator__side--employee": tone === "employee",
        "cost-calculator__side--consultant": tone === "consultant",
      })}
    >
      <header className="cost-calculator__side-head">
        <h3 className="cost-calculator__side-title">{title}</h3>
        {lede ? <p className="cost-calculator__side-lede">{lede}</p> : null}
      </header>
      <div className="cost-calculator__side-body">{children}</div>
      {footer ? <footer className="cost-calculator__side-foot">{footer}</footer> : null}
    </section>
  );
}

interface SideTotalsProps {
  tone: "employee" | "consultant";
  dayLabel: string;
  dayValue: string;
  daySub?: string;
  dayExtra?: ReactNode;
  annualLabel: string;
  annualValue: string;
  annualSub?: string;
}

function SideTotals({
  tone,
  dayLabel,
  dayValue,
  daySub,
  dayExtra,
  annualLabel,
  annualValue,
  annualSub,
}: SideTotalsProps) {
  return (
    <>
      <div className="cost-calculator__side-metric">
        <span className="cost-calculator__side-metric-label">{dayLabel}</span>
        <span
          className={classNames("cost-calculator__side-metric-value", {
            "cost-calculator__side-metric-value--consultant": tone === "consultant",
            "cost-calculator__side-metric-value--employee": tone === "employee",
          })}
        >
          {dayValue}
        </span>
        {daySub ? <span className="cost-calculator__side-metric-sub">{daySub}</span> : null}
        {dayExtra}
      </div>
      <div className="cost-calculator__side-metric cost-calculator__side-metric--annual">
        <span className="cost-calculator__side-metric-label">{annualLabel}</span>
        <span
          className={classNames("cost-calculator__side-metric-value", {
            "cost-calculator__side-metric-value--consultant": tone === "consultant",
            "cost-calculator__side-metric-value--employee": tone === "employee",
          })}
        >
          {annualValue}
        </span>
        {annualSub ? <span className="cost-calculator__side-metric-sub">{annualSub}</span> : null}
      </div>
    </>
  );
}

interface CostCalculatorProps {
  role?: CalculatorRole;
}

export default function CostCalculator({ role = DEFAULT_CALCULATOR_ROLE }: CostCalculatorProps) {
  const { t } = useTranslation("cost-calculator");
  const router = useRouter();
  const locale = router.locale ?? "fr";
  const currencyFormatter = useMemo(() => createCurrencyFormatter(locale), [locale]);
  const fmt0 = (n: number) => currencyFormatter.format(Math.round(n));
  const pct1 = (n: number) => `${n.toFixed(1).replace(".", locale === "en" ? "." : ",")} %`;

  const rolePreset = getCalculatorRolePreset(role);
  const salaryFromQuery = router.isReady
    ? parseGrossSalaryQueryParam(router.query.salaire ?? router.query.salary)
    : null;
  const [salaireOverride, setSalaireOverride] = useState<number | null>(null);
  const salaire = salaireOverride ?? salaryFromQuery ?? rolePreset.defaultGrossSalary;
  const [masseSalariale, setMasseSalariale] = useState(rolePreset.defaultCompanyPayroll);
  const [avantagesPct, setAvantagesPct] = useState(rolePreset.defaultBenefitsPct);
  const [primePct, setPrimePct] = useState(rolePreset.defaultBonusPct);
  const [joursProductifs, setJoursProductifs] = useState(rolePreset.defaultProductiveDays);
  const [inclureAnnee1, setInclureAnnee1] = useState(true);
  const [recrutementPct, setRecrutementPct] = useState(rolePreset.defaultRecruitmentPct);
  const [onboardingMois, setOnboardingMois] = useState(rolePreset.defaultOnboardingMonths);
  const [onboardingProductivite, setOnboardingProductivite] = useState(
    rolePreset.defaultOnboardingProductivity
  );
  const [inclureCoordination, setInclureCoordination] = useState(true);
  const [heuresCoordination, setHeuresCoordination] = useState(
    rolePreset.defaultCoordinationHoursPerWeek
  );
  const [inclureOutilsEmployeur, setInclureOutilsEmployeur] = useState(true);
  const [coutOutilsEmployeur, setCoutOutilsEmployeur] = useState(
    rolePreset.defaultEmployeeToolsAnnualCost
  );
  const [inclureMilieu, setInclureMilieu] = useState(true);
  const [coutMilieu, setCoutMilieu] = useState(
    WORKPLACE_ANNUAL_COST[rolePreset.defaultWorkplaceMode]
  );
  const [inclureRoulement, setInclureRoulement] = useState(true);
  const [ancienneteAnnees, setAncienneteAnnees] = useState(DEFAULT_AVERAGE_TENURE_YEARS);
  const [inclureFinEmploi, setInclureFinEmploi] = useState(true);
  const [semainesFinEmploi, setSemainesFinEmploi] = useState(DEFAULT_SEVERANCE_WEEKS);
  const [joursSemaine, setJoursSemaine] = useState(rolePreset.defaultBilledDaysPerWeek);

  const r = useMemo(
    () =>
      computeDayRateComparison(
        buildDayRateComparisonInput(rolePreset, {
          grossSalary: salaire,
          companyTotalPayroll: masseSalariale,
          benefitsPct: avantagesPct,
          bonusPct: primePct,
          productiveDays: joursProductifs,
          consultantDayRate: BASE_CONSULTANT_DAY_RATE,
          billedDaysPerWeek: joursSemaine,
          includeHiringFriction: inclureAnnee1,
          recruitmentCostPct: recrutementPct,
          onboardingMonths: onboardingMois,
          onboardingProductivityPct: onboardingProductivite,
          includeCoordinationOverhead: inclureCoordination,
          coordinationHoursPerWeek: heuresCoordination,
          includeEmployeeTools: inclureOutilsEmployeur,
          employeeToolsAnnualCost: coutOutilsEmployeur,
          includeWorkplace: inclureMilieu,
          workplaceAnnualCost: coutMilieu,
          includeTurnover: inclureRoulement,
          averageTenureYears: ancienneteAnnees,
          includeSeverance: inclureFinEmploi,
          severanceWeeks: semainesFinEmploi,
        })
      ),
    [
      rolePreset,
      salaire,
      masseSalariale,
      avantagesPct,
      primePct,
      joursProductifs,
      inclureAnnee1,
      recrutementPct,
      onboardingMois,
      onboardingProductivite,
      inclureCoordination,
      heuresCoordination,
      inclureOutilsEmployeur,
      coutOutilsEmployeur,
      inclureMilieu,
      coutMilieu,
      inclureRoulement,
      ancienneteAnnees,
      inclureFinEmploi,
      semainesFinEmploi,
      joursSemaine,
    ]
  );

  const friction = r.hiringFriction;
  const autonomy = r.autonomyOverhead;
  const lifecycle = r.lifecycle;
  const breakdown = r.quebecBreakdown;
  const verdict = resolveCalculatorVerdict({
    billedDaysPerWeek: joursSemaine,
    annualSaving: r.annualSaving,
    consultantAnnualCost: r.consultantAnnualCost,
    employeeAnnualCost: r.employeeAnnualCost,
  });
  const equivalentLabel = Number.isInteger(verdict.weeklyEquivalentDays)
    ? String(verdict.weeklyEquivalentDays)
    : verdict.weeklyEquivalentDays.toFixed(1).replace(".", locale === "en" ? "." : ",");
  const activeWorkplaceMode = getWorkplaceMode(coutMilieu);

  return (
    <div className="cost-calculator">
      <div className="cost-calculator__sticky">
        <div
          className={classNames("cost-calculator__hero", {
            "cost-calculator__hero--win": verdict.consultantWinsAnnual,
            "cost-calculator__hero--parity": verdict.isFocusCeiling,
          })}
        >
          <div className="cost-calculator__hero-kicker">{t("results.verdict.kicker")}</div>
          <p className="cost-calculator__hero-headline">
            {t(verdict.headlineKey, { days: joursSemaine })}
          </p>
          <p className="cost-calculator__hero-ratio-value">
            {t("results.verdict.hero.ratio", {
              days: joursSemaine,
              equivalent: equivalentLabel,
            })}
          </p>
          <p className="cost-calculator__hero-ratio-hint">{t(verdict.ratioHintKey)}</p>
          <p className="cost-calculator__hero-proof-detail">
            {t("results.verdict.hero.detail", {
              consultant: fmt0(r.consultantAnnualCost),
              employee: fmt0(r.employeeAnnualCost),
              pct: verdict.engagementSharePct,
            })}
          </p>
        </div>
      </div>

      <div className="cost-calculator__inputs">
        <CompareSide
          title={t("inputs.consultant.title", {
            role: t(`fields.role.options.${role}`),
          })}
          tone="consultant"
          footer={
            <SideTotals
              tone="consultant"
              dayLabel={t("results.dayCost.consultantLabel")}
              dayValue={`${fmt0(r.effectiveConsultantDayRate)}/j`}
              daySub={t("results.dayCost.consultantSub", { days: joursSemaine })}
              annualLabel={t("results.annual.consultantLabel", { days: joursSemaine })}
              annualValue={`${fmt0(r.consultantAnnualCost)}/an`}
              annualSub={t("results.annual.consultantSub", {
                vacation: CONSULTANT_VACATION_WEEKS_PER_YEAR,
                billableWeeks: BILLABLE_WEEKS_PER_YEAR,
              })}
            />
          }
        >
          <Field
            label={t("fields.billedDays.label")}
            hint={t("fields.billedDays.hint", { count: joursSemaine })}
          >
            <div
              className="cost-calculator__day-picks"
              role="group"
              aria-label={t("fields.billedDays.label")}
            >
              {[1, 2, 3].map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setJoursSemaine(d)}
                  className={classNames("cost-calculator__day-pick", {
                    "cost-calculator__day-pick--active": joursSemaine === d,
                  })}
                  aria-pressed={joursSemaine === d}
                >
                  {d}
                </button>
              ))}
            </div>
            {r.volumeDiscountPct > 0 && (
              <p className="cost-calculator__help">
                {t("fields.billedDays.volumeDiscount", {
                  pct: r.volumeDiscountPct,
                  rate: fmt0(r.effectiveConsultantDayRate),
                })}
              </p>
            )}
          </Field>
        </CompareSide>

        <p className="cost-calculator__vs" aria-hidden="true">
          {t("inputs.vs")}
        </p>

        <CompareSide
          title={t("inputs.employee.title")}
          tone="employee"
          footer={
            <>
              <SideTotals
                tone="employee"
                dayLabel={t("results.dayCost.steadyLabel")}
                dayValue={`${fmt0(r.steadyStateCostPerDay)}/j`}
                daySub={t("results.dayCost.steadySub", { days: joursProductifs })}
                dayExtra={
                  friction ? (
                    <div className="cost-calculator__side-metric-extra">
                      <span className="cost-calculator__side-metric-label">
                        {t("results.dayCost.yearOneLabel")}
                      </span>
                      <span className="cost-calculator__side-metric-value cost-calculator__side-metric-value--employee">
                        {fmt0(r.yearOneCostPerDay)}/j
                      </span>
                      <span className="cost-calculator__side-metric-sub">
                        {t("results.dayCost.yearOneSub", {
                          days: r.effectiveProductiveDays,
                          lost: friction.onboardingLostDays,
                        })}
                      </span>
                    </div>
                  ) : null
                }
                annualLabel={t("results.annual.employeeLabel")}
                annualValue={`${fmt0(r.employeeAnnualCost)}/an`}
                annualSub={t("results.annual.employeeSub")}
              />

              <details className="cost-calculator__detail">
                <summary className="cost-calculator__detail-summary">
                  {t("results.detailTitle")}
                </summary>
                <div className="cost-calculator__detail-body">
                  {breakdown && (
                    <BreakdownSection
                      title={t("results.breakdown.title", { year: breakdown.year })}
                    >
                      <ul className="cost-calculator__breakdown-list">
                        {breakdown.mandatoryContributions.map((line) => (
                          <li key={line.id} className="cost-calculator__breakdown-item">
                            <span>{t(`results.breakdown.lines.${line.id}`)}</span>
                            <span>{fmt0(line.amount)}</span>
                          </li>
                        ))}
                        {r.bonusAmount > 0 && (
                          <li className="cost-calculator__breakdown-item">
                            <span>{t("results.breakdown.lines.bonus")}</span>
                            <span>{fmt0(r.bonusAmount)}</span>
                          </li>
                        )}
                        <li className="cost-calculator__breakdown-item">
                          <span>{t("results.breakdown.lines.benefits")}</span>
                          <span>{fmt0(breakdown.benefitsAmount)}</span>
                        </li>
                        <li className="cost-calculator__breakdown-item cost-calculator__breakdown-item--total">
                          <span>{t("results.breakdown.loadedTotal")}</span>
                          <span>{fmt0(r.baseEmployerCost)}</span>
                        </li>
                      </ul>
                      <p className="cost-calculator__breakdown-foot">
                        {t("results.breakdown.footnote", {
                          fss: pct1(breakdown.fssRate * 100),
                        })}
                      </p>
                    </BreakdownSection>
                  )}

                  {autonomy &&
                    (autonomy.coordinationAnnualCost > 0 ||
                      autonomy.employeeToolsAnnualCost > 0 ||
                      autonomy.workplaceAnnualCost > 0) && (
                      <BreakdownSection title={t("results.recurring.title")}>
                        <ul className="cost-calculator__breakdown-list">
                          {autonomy.coordinationAnnualCost > 0 && (
                            <li className="cost-calculator__breakdown-item">
                              <span>{t("results.recurring.coordination")}</span>
                              <span>{fmt0(autonomy.coordinationAnnualCost)}</span>
                            </li>
                          )}
                          {autonomy.employeeToolsAnnualCost > 0 && (
                            <li className="cost-calculator__breakdown-item">
                              <span>{t("results.recurring.tools")}</span>
                              <span>{fmt0(autonomy.employeeToolsAnnualCost)}</span>
                            </li>
                          )}
                          {autonomy.workplaceAnnualCost > 0 && (
                            <li className="cost-calculator__breakdown-item">
                              <span>{t("results.recurring.workplace")}</span>
                              <span>{fmt0(autonomy.workplaceAnnualCost)}</span>
                            </li>
                          )}
                          <li className="cost-calculator__breakdown-item cost-calculator__breakdown-item--consultant">
                            <span>{t("results.recurring.consultantTools")}</span>
                            <span>{t("results.recurring.consultantToolsIncluded")}</span>
                          </li>
                        </ul>
                        {autonomy.coordinationAnnualCost > 0 && (
                          <p className="cost-calculator__breakdown-foot">
                            {t("results.recurring.autonomyFootnote", {
                              hours: autonomy.coordinationHoursPerWeek,
                              hourly: fmt0(autonomy.coordinationHourlyCost),
                            })}
                          </p>
                        )}
                      </BreakdownSection>
                    )}

                  {lifecycle &&
                    (lifecycle.amortizedRecruitmentCost > 0 ||
                      lifecycle.severanceAnnualCost > 0) && (
                      <BreakdownSection title={t("results.lifecycle.title")}>
                        <ul className="cost-calculator__breakdown-list">
                          {lifecycle.amortizedRecruitmentCost > 0 && (
                            <li className="cost-calculator__breakdown-item">
                              <span>{t("results.lifecycle.turnover")}</span>
                              <span>{fmt0(lifecycle.amortizedRecruitmentCost)}</span>
                            </li>
                          )}
                          {lifecycle.severanceAnnualCost > 0 && (
                            <li className="cost-calculator__breakdown-item">
                              <span>{t("results.lifecycle.severance")}</span>
                              <span>{fmt0(lifecycle.severanceAnnualCost)}</span>
                            </li>
                          )}
                          <li className="cost-calculator__breakdown-item cost-calculator__breakdown-item--consultant">
                            <span>{t("results.lifecycle.consultant")}</span>
                            <span>{t("results.lifecycle.consultantIncluded")}</span>
                          </li>
                        </ul>
                        <p className="cost-calculator__breakdown-foot">
                          {t("results.lifecycle.footnote", {
                            tenure: lifecycle.averageTenureYears,
                            lostDays: lifecycle.amortizedRampLostDays,
                          })}
                        </p>
                      </BreakdownSection>
                    )}

                  {friction && (
                    <BreakdownSection title={t("results.yearOne.title")}>
                      <ul className="cost-calculator__breakdown-list">
                        <li className="cost-calculator__breakdown-item">
                          <span>{t("results.yearOne.recruitment")}</span>
                          <span>{fmt0(friction.recruitmentCost)}</span>
                        </li>
                      </ul>
                      <p className="cost-calculator__breakdown-foot">
                        {t("results.yearOne.rampNote", {
                          months: onboardingMois,
                          productivity: onboardingProductivite,
                          lostDays: friction.onboardingLostDays,
                        })}
                      </p>
                    </BreakdownSection>
                  )}

                  <BreakdownSection title={t("results.notes.title")}>
                    <p className="cost-calculator__note-text">{t("results.autonomy.text")}</p>
                    <p className="cost-calculator__note-text">
                      {t("results.consultantConsiderations.text")}
                    </p>
                    <p className="cost-calculator__panel-note cost-calculator__panel-note--muted">
                      {t("results.taxes.note")}
                    </p>
                  </BreakdownSection>
                </div>
              </details>
            </>
          }
        >
          <Field label={t("fields.salary.label")} hint={fmt0(salaire)}>
            <input
              type="range"
              min={GROSS_SALARY_MIN}
              max={GROSS_SALARY_MAX}
              step={GROSS_SALARY_STEP}
              value={salaire}
              onChange={(e) => setSalaireOverride(Number(e.target.value))}
              className="cost-calculator__range"
              aria-label={t("fields.salary.label")}
              aria-valuemin={GROSS_SALARY_MIN}
              aria-valuemax={GROSS_SALARY_MAX}
              aria-valuenow={salaire}
            />
          </Field>

          <div className="cost-calculator__advanced">
            <p className="cost-calculator__advanced-label">{t("fields.advanced.label")}</p>

            <InputSection title={t("fields.employeeCost.title")}>
              <Field label={t("fields.companyPayroll.label")} hint={fmt0(masseSalariale)}>
                <input
                  type="range"
                  min={100000}
                  max={5000000}
                  step={50000}
                  value={masseSalariale}
                  onChange={(e) => setMasseSalariale(Number(e.target.value))}
                  className="cost-calculator__range"
                  aria-valuemin={100000}
                  aria-valuemax={5000000}
                  aria-valuenow={masseSalariale}
                />
              </Field>

              <Field label={t("fields.benefits.label")} hint={`${avantagesPct} %`}>
                <input
                  type="range"
                  min={0}
                  max={12}
                  step={1}
                  value={avantagesPct}
                  onChange={(e) => setAvantagesPct(Number(e.target.value))}
                  className="cost-calculator__range"
                  aria-valuemin={0}
                  aria-valuemax={12}
                  aria-valuenow={avantagesPct}
                />
              </Field>

              <Field label={t("fields.bonus.label")} hint={`${primePct} %`}>
                <input
                  type="range"
                  min={0}
                  max={30}
                  step={1}
                  value={primePct}
                  onChange={(e) => setPrimePct(Number(e.target.value))}
                  className="cost-calculator__range"
                  aria-valuemin={0}
                  aria-valuemax={30}
                  aria-valuenow={primePct}
                />
              </Field>

              <Field
                label={t("fields.productiveDays.label")}
                hint={t("fields.productiveDays.hint", { count: joursProductifs })}
              >
                <input
                  type="range"
                  min={180}
                  max={260}
                  step={5}
                  value={joursProductifs}
                  onChange={(e) => setJoursProductifs(Number(e.target.value))}
                  className="cost-calculator__range"
                  aria-valuemin={180}
                  aria-valuemax={260}
                  aria-valuenow={joursProductifs}
                />
              </Field>
            </InputSection>

            <InputSection title={t("fields.yearOne.title")}>
              <label className="cost-calculator__checkbox">
                <input
                  type="checkbox"
                  checked={inclureAnnee1}
                  onChange={(e) => setInclureAnnee1(e.target.checked)}
                />
                <span>{t("fields.yearOne.include")}</span>
              </label>

              {(inclureAnnee1 || inclureRoulement) && (
                <>
                  <Field label={t("fields.recruitment.label")} hint={`${recrutementPct} %`}>
                    <input
                      type="range"
                      min={0}
                      max={25}
                      step={1}
                      value={recrutementPct}
                      onChange={(e) => setRecrutementPct(Number(e.target.value))}
                      className="cost-calculator__range"
                      aria-valuemin={0}
                      aria-valuemax={25}
                      aria-valuenow={recrutementPct}
                    />
                  </Field>

                  <Field
                    label={t("fields.onboardingMonths.label")}
                    hint={t("fields.onboardingMonths.hint", { count: onboardingMois })}
                  >
                    <input
                      type="range"
                      min={0}
                      max={6}
                      step={1}
                      value={onboardingMois}
                      onChange={(e) => setOnboardingMois(Number(e.target.value))}
                      className="cost-calculator__range"
                      aria-valuemin={0}
                      aria-valuemax={6}
                      aria-valuenow={onboardingMois}
                    />
                  </Field>

                  <Field
                    label={t("fields.onboardingProductivity.label")}
                    hint={`${onboardingProductivite} %`}
                  >
                    <input
                      type="range"
                      min={25}
                      max={100}
                      step={5}
                      value={onboardingProductivite}
                      onChange={(e) => setOnboardingProductivite(Number(e.target.value))}
                      className="cost-calculator__range"
                      aria-valuemin={25}
                      aria-valuemax={100}
                      aria-valuenow={onboardingProductivite}
                    />
                  </Field>
                </>
              )}
            </InputSection>

            <InputSection title={t("fields.autonomy.title")}>
              <label className="cost-calculator__checkbox">
                <input
                  type="checkbox"
                  checked={inclureCoordination}
                  onChange={(e) => setInclureCoordination(e.target.checked)}
                />
                <span>{t("fields.autonomy.include")}</span>
              </label>

              {inclureCoordination && (
                <Field
                  label={t("fields.coordination.label")}
                  hint={t("fields.coordination.hint", { count: heuresCoordination })}
                >
                  <input
                    type="range"
                    min={0}
                    max={8}
                    step={1}
                    value={heuresCoordination}
                    onChange={(e) => setHeuresCoordination(Number(e.target.value))}
                    className="cost-calculator__range"
                    aria-valuemin={0}
                    aria-valuemax={8}
                    aria-valuenow={heuresCoordination}
                  />
                </Field>
              )}

              <label className="cost-calculator__checkbox">
                <input
                  type="checkbox"
                  checked={inclureOutilsEmployeur}
                  onChange={(e) => setInclureOutilsEmployeur(e.target.checked)}
                />
                <span>{t("fields.tools.includeEmployee")}</span>
              </label>

              {inclureOutilsEmployeur && (
                <Field label={t("fields.tools.employee.label")} hint={fmt0(coutOutilsEmployeur)}>
                  <input
                    type="range"
                    min={0}
                    max={10000}
                    step={500}
                    value={coutOutilsEmployeur}
                    onChange={(e) => setCoutOutilsEmployeur(Number(e.target.value))}
                    className="cost-calculator__range"
                    aria-valuemin={0}
                    aria-valuemax={10000}
                    aria-valuenow={coutOutilsEmployeur}
                  />
                </Field>
              )}

              <label className="cost-calculator__checkbox">
                <input
                  type="checkbox"
                  checked={inclureMilieu}
                  onChange={(e) => setInclureMilieu(e.target.checked)}
                />
                <span>{t("fields.workplace.include")}</span>
              </label>

              {inclureMilieu && (
                <Field label={t("fields.workplace.label")} hint={fmt0(coutMilieu)}>
                  <select
                    className="cost-calculator__select"
                    value={activeWorkplaceMode ?? "hybrid"}
                    aria-label={t("fields.workplace.label")}
                    onChange={(e) =>
                      setCoutMilieu(WORKPLACE_ANNUAL_COST[e.target.value as WorkplaceMode])
                    }
                  >
                    {WORKPLACE_MODE_LIST.map(({ mode, cost }) => (
                      <option key={mode} value={mode}>
                        {t(`fields.workplace.options.${mode}`)} · {fmt0(cost)}/an
                      </option>
                    ))}
                  </select>
                </Field>
              )}
            </InputSection>

            <InputSection title={t("fields.lifecycle.title")}>
              <label className="cost-calculator__checkbox">
                <input
                  type="checkbox"
                  checked={inclureRoulement}
                  onChange={(e) => setInclureRoulement(e.target.checked)}
                />
                <span>{t("fields.turnover.include")}</span>
              </label>

              {(inclureRoulement || inclureFinEmploi) && (
                <Field
                  label={t("fields.tenure.label")}
                  hint={t("fields.tenure.hint", { count: ancienneteAnnees })}
                >
                  <input
                    type="range"
                    min={1}
                    max={8}
                    step={1}
                    value={ancienneteAnnees}
                    onChange={(e) => setAncienneteAnnees(Number(e.target.value))}
                    className="cost-calculator__range"
                    aria-valuemin={1}
                    aria-valuemax={8}
                    aria-valuenow={ancienneteAnnees}
                  />
                </Field>
              )}

              <label className="cost-calculator__checkbox">
                <input
                  type="checkbox"
                  checked={inclureFinEmploi}
                  onChange={(e) => setInclureFinEmploi(e.target.checked)}
                />
                <span>{t("fields.severance.include")}</span>
              </label>

              {inclureFinEmploi && (
                <Field
                  label={t("fields.severance.label")}
                  hint={t("fields.severance.hint", { count: semainesFinEmploi })}
                >
                  <input
                    type="range"
                    min={0}
                    max={26}
                    step={1}
                    value={semainesFinEmploi}
                    onChange={(e) => setSemainesFinEmploi(Number(e.target.value))}
                    className="cost-calculator__range"
                    aria-valuemin={0}
                    aria-valuemax={26}
                    aria-valuenow={semainesFinEmploi}
                  />
                </Field>
              )}
            </InputSection>
          </div>
        </CompareSide>
      </div>

      <p className="cost-calculator__disclaimer">
        {t("disclaimer", {
          vacation: CONSULTANT_VACATION_WEEKS_PER_YEAR,
          workingWeeks: CONSULTANT_WORKING_WEEKS_PER_YEAR,
        })}
      </p>
    </div>
  );
}
