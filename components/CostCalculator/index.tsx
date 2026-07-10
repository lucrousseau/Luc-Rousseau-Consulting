import classNames from "classnames";
import { useMemo, useState, type ReactNode } from "react";
import { useTranslation } from "next-i18next/pages";
import { useRouter } from "next/router";

import {
  CALCULATOR_ROLES,
  CONSULTANT_RATE_TIERS,
  CONSULTANT_RATE_TIER_LIST,
  WORKPLACE_ANNUAL_COST,
  WORKPLACE_MODE_LIST,
  getCalculatorRolePreset,
  getConsultantRateTier,
  getWorkplaceMode,
  type CalculatorRole,
} from "../../commons/costCalculatorPresets";
import {
  CONSULTANT_WORKING_WEEKS_PER_YEAR,
  DEFAULT_AVERAGE_TENURE_YEARS,
  DEFAULT_SEVERANCE_WEEKS,
  QUEBEC_STAT_HOLIDAYS,
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

interface StatProps {
  label: string;
  value: string;
  sub?: string;
  tone?: "employee" | "consultant" | "neutral";
}

function Stat({ label, value, sub, tone = "neutral" }: StatProps) {
  return (
    <div className="cost-calculator__stat">
      <div className="cost-calculator__stat-label">{label}</div>
      <div
        className={classNames("cost-calculator__stat-value", {
          "cost-calculator__stat-value--employee": tone === "employee",
          "cost-calculator__stat-value--consultant": tone === "consultant",
        })}
      >
        {value}
      </div>
      {sub && <div className="cost-calculator__stat-sub">{sub}</div>}
    </div>
  );
}

interface BreakdownDetailsProps {
  title: string;
  children: ReactNode;
}

function BreakdownDetails({ title, children }: BreakdownDetailsProps) {
  return (
    <details className="cost-calculator__details">
      <summary className="cost-calculator__details-summary">{title}</summary>
      <div className="cost-calculator__details-body">{children}</div>
    </details>
  );
}

interface InputSectionProps {
  title: string;
  lede?: string;
  children: ReactNode;
}

function InputSection({ title, lede, children }: InputSectionProps) {
  return (
    <details className="cost-calculator__input-section">
      <summary className="cost-calculator__input-section-summary">
        {title}
        {lede && <span className="cost-calculator__input-section-lede">{lede}</span>}
      </summary>
      <div className="cost-calculator__input-section-body">{children}</div>
    </details>
  );
}

const DEFAULT_ROLE: CalculatorRole = "productManager";

function applyRolePreset(role: CalculatorRole) {
  const preset = getCalculatorRolePreset(role);
  return {
    salaire: preset.defaultGrossSalary,
    masseSalariale: preset.defaultCompanyPayroll,
    avantagesPct: preset.defaultBenefitsPct,
    primePct: preset.defaultBonusPct,
    joursProductifs: preset.defaultProductiveDays,
    recrutementPct: preset.defaultRecruitmentPct,
    onboardingMois: preset.defaultOnboardingMonths,
    onboardingProductivite: preset.defaultOnboardingProductivity,
    heuresCoordination: preset.defaultCoordinationHoursPerWeek,
    coutOutilsEmployeur: preset.defaultEmployeeToolsAnnualCost,
    coutMilieu: WORKPLACE_ANNUAL_COST[preset.defaultWorkplaceMode],
    tarif: preset.defaultConsultantDayRate,
    joursSemaine: preset.defaultBilledDaysPerWeek,
  };
}

export default function CostCalculator() {
  const { t } = useTranslation("cost-calculator");
  const router = useRouter();
  const locale = router.locale ?? "fr";
  const fmt0 = (n: number) => createCurrencyFormatter(locale).format(Math.round(n));
  const pct1 = (n: number) => `${n.toFixed(1).replace(".", locale === "en" ? "." : ",")} %`;

  const initialPreset = getCalculatorRolePreset(DEFAULT_ROLE);
  const [role, setRole] = useState<CalculatorRole>(DEFAULT_ROLE);
  const [salaire, setSalaire] = useState(initialPreset.defaultGrossSalary);
  const [modeCoutTotal, setModeCoutTotal] = useState(false);
  const [masseSalariale, setMasseSalariale] = useState(initialPreset.defaultCompanyPayroll);
  const [avantagesPct, setAvantagesPct] = useState(initialPreset.defaultBenefitsPct);
  const [primePct, setPrimePct] = useState(initialPreset.defaultBonusPct);
  const [joursProductifs, setJoursProductifs] = useState(initialPreset.defaultProductiveDays);
  const [inclureAnnee1, setInclureAnnee1] = useState(true);
  const [recrutementPct, setRecrutementPct] = useState(initialPreset.defaultRecruitmentPct);
  const [onboardingMois, setOnboardingMois] = useState(initialPreset.defaultOnboardingMonths);
  const [onboardingProductivite, setOnboardingProductivite] = useState(
    initialPreset.defaultOnboardingProductivity
  );
  const [inclureCoordination, setInclureCoordination] = useState(true);
  const [heuresCoordination, setHeuresCoordination] = useState(
    initialPreset.defaultCoordinationHoursPerWeek
  );
  const [inclureOutilsEmployeur, setInclureOutilsEmployeur] = useState(true);
  const [coutOutilsEmployeur, setCoutOutilsEmployeur] = useState(
    initialPreset.defaultEmployeeToolsAnnualCost
  );
  const [inclureMilieu, setInclureMilieu] = useState(true);
  const [coutMilieu, setCoutMilieu] = useState(
    WORKPLACE_ANNUAL_COST[initialPreset.defaultWorkplaceMode]
  );
  const [inclureRoulement, setInclureRoulement] = useState(true);
  const [ancienneteAnnees, setAncienneteAnnees] = useState(DEFAULT_AVERAGE_TENURE_YEARS);
  const [inclureFinEmploi, setInclureFinEmploi] = useState(true);
  const [semainesFinEmploi, setSemainesFinEmploi] = useState(DEFAULT_SEVERANCE_WEEKS);
  const [tarif, setTarif] = useState(initialPreset.defaultConsultantDayRate);
  const [joursSemaine, setJoursSemaine] = useState(initialPreset.defaultBilledDaysPerWeek);

  const rolePreset = getCalculatorRolePreset(role);

  const handleRoleChange = (nextRole: CalculatorRole) => {
    setRole(nextRole);
    const preset = applyRolePreset(nextRole);
    setSalaire(preset.salaire);
    setMasseSalariale(preset.masseSalariale);
    setAvantagesPct(preset.avantagesPct);
    setPrimePct(preset.primePct);
    setJoursProductifs(preset.joursProductifs);
    setRecrutementPct(preset.recrutementPct);
    setOnboardingMois(preset.onboardingMois);
    setOnboardingProductivite(preset.onboardingProductivite);
    setHeuresCoordination(preset.heuresCoordination);
    setCoutOutilsEmployeur(preset.coutOutilsEmployeur);
    setCoutMilieu(preset.coutMilieu);
    setTarif(preset.tarif);
    setJoursSemaine(preset.joursSemaine);
  };

  const r = useMemo(
    () =>
      computeDayRateComparison({
        grossSalary: salaire,
        isTotalEmployerCost: modeCoutTotal,
        companyTotalPayroll: masseSalariale,
        cnesstSector: rolePreset.cnesstSector,
        benefitsPct: avantagesPct,
        bonusPct: primePct,
        productiveDays: joursProductifs,
        consultantDayRate: tarif,
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
      }),
    [
      rolePreset.cnesstSector,
      salaire,
      modeCoutTotal,
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
      tarif,
      joursSemaine,
    ]
  );

  const friction = r.hiringFriction;
  const autonomy = r.autonomyOverhead;
  const lifecycle = r.lifecycle;
  const breakdown = r.quebecBreakdown;
  const maxBar = Math.max(r.yearOneCostPerDay, r.steadyStateCostPerDay, tarif) || 1;
  const savingPct = pct1(Math.abs(r.annualSavingRelative) * 100);
  const activeTier = getConsultantRateTier(tarif);
  const activeWorkplaceMode = getWorkplaceMode(coutMilieu);

  const consultantWinsAnnual = r.annualSaving >= 0;
  // Luc's positioning: 1-2 d/wk is the fractional sweet spot, 3 is the ceiling.
  const cadenceIdeal = joursSemaine <= 2;

  return (
    <div className="cost-calculator">
      <div className="cost-calculator__grid">
        <div className="cost-calculator__inputs">
          <div className="cost-calculator__card">
            <Field label={t("fields.role.label")}>
              <div
                className="cost-calculator__segmented"
                role="group"
                aria-label={t("fields.role.label")}
              >
                {CALCULATOR_ROLES.map((roleId) => (
                  <button
                    key={roleId}
                    type="button"
                    onClick={() => handleRoleChange(roleId)}
                    className={classNames("cost-calculator__segment", {
                      "cost-calculator__segment--active": role === roleId,
                    })}
                    aria-pressed={role === roleId}
                  >
                    {t(`fields.role.options.${roleId}`)}
                  </button>
                ))}
              </div>
              <p className="cost-calculator__help">{t(`fields.role.help.${role}`)}</p>
            </Field>

            <Field label={t("fields.engagementTier.label")}>
              <div
                className="cost-calculator__segmented"
                role="group"
                aria-label={t("fields.engagementTier.label")}
              >
                {CONSULTANT_RATE_TIER_LIST.map(({ tier, rate }) => (
                  <button
                    key={tier}
                    type="button"
                    onClick={() => setTarif(rate)}
                    className={classNames(
                      "cost-calculator__segment cost-calculator__segment--tier",
                      {
                        "cost-calculator__segment--active": activeTier === tier,
                      }
                    )}
                    aria-pressed={activeTier === tier}
                  >
                    <span className="cost-calculator__tier-name">
                      {t(`fields.engagementTier.options.${tier}`)}
                    </span>
                    <span className="cost-calculator__tier-desc">
                      {t(`fields.engagementTier.descriptions.${tier}`)}
                    </span>
                    <span className="cost-calculator__tier-rate">{fmt0(rate)}/j</span>
                  </button>
                ))}
              </div>
              <p className="cost-calculator__help">
                {t("fields.engagementTier.help", {
                  ongoing: fmt0(CONSULTANT_RATE_TIERS.ongoing),
                  structural: fmt0(CONSULTANT_RATE_TIERS.structural),
                  turnaround: fmt0(CONSULTANT_RATE_TIERS.turnaround),
                })}
              </p>
            </Field>

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
              <p className="cost-calculator__help">{t("fields.billedDays.help")}</p>
            </Field>

            <InputSection
              title={t("fields.employeeCost.title")}
              lede={t("fields.employeeCost.lede")}
            >
              <Field label={t("fields.salary.label")} hint={fmt0(salaire)}>
                <input
                  type="range"
                  min={50000}
                  max={250000}
                  step={5000}
                  value={salaire}
                  onChange={(e) => setSalaire(Number(e.target.value))}
                  className="cost-calculator__range cost-calculator__range--consultant"
                  aria-valuemin={50000}
                  aria-valuemax={250000}
                  aria-valuenow={salaire}
                />
                <input
                  type="number"
                  value={salaire}
                  onChange={(e) => setSalaire(Number(e.target.value) || 0)}
                  className="cost-calculator__number"
                  aria-label={t("fields.salary.label")}
                />
              </Field>

              <Field label={t("fields.salaryMode.label")}>
                <div
                  className="cost-calculator__segmented"
                  role="group"
                  aria-label={t("fields.salaryMode.label")}
                >
                  <button
                    type="button"
                    onClick={() => setModeCoutTotal(false)}
                    className={classNames("cost-calculator__segment", {
                      "cost-calculator__segment--active": !modeCoutTotal,
                    })}
                    aria-pressed={!modeCoutTotal}
                  >
                    {t("fields.salaryMode.gross")}
                  </button>
                  <button
                    type="button"
                    onClick={() => setModeCoutTotal(true)}
                    className={classNames("cost-calculator__segment", {
                      "cost-calculator__segment--active": modeCoutTotal,
                    })}
                    aria-pressed={modeCoutTotal}
                  >
                    {t("fields.salaryMode.total")}
                  </button>
                </div>
              </Field>

              {!modeCoutTotal && (
                <>
                  <Field label={t("fields.companyPayroll.label")} hint={fmt0(masseSalariale)}>
                    <input
                      type="range"
                      min={100000}
                      max={5000000}
                      step={50000}
                      value={masseSalariale}
                      onChange={(e) => setMasseSalariale(Number(e.target.value))}
                      className="cost-calculator__range cost-calculator__range--employee"
                      aria-valuemin={100000}
                      aria-valuemax={5000000}
                      aria-valuenow={masseSalariale}
                    />
                    <p className="cost-calculator__help">{t("fields.companyPayroll.help")}</p>
                  </Field>

                  <Field label={t("fields.benefits.label")} hint={`${avantagesPct} %`}>
                    <input
                      type="range"
                      min={0}
                      max={12}
                      step={1}
                      value={avantagesPct}
                      onChange={(e) => setAvantagesPct(Number(e.target.value))}
                      className="cost-calculator__range cost-calculator__range--employee"
                      aria-valuemin={0}
                      aria-valuemax={12}
                      aria-valuenow={avantagesPct}
                    />
                    <p className="cost-calculator__help">{t("fields.benefits.help")}</p>
                  </Field>

                  <Field label={t("fields.bonus.label")} hint={`${primePct} %`}>
                    <input
                      type="range"
                      min={0}
                      max={30}
                      step={1}
                      value={primePct}
                      onChange={(e) => setPrimePct(Number(e.target.value))}
                      className="cost-calculator__range cost-calculator__range--employee"
                      aria-valuemin={0}
                      aria-valuemax={30}
                      aria-valuenow={primePct}
                    />
                    <p className="cost-calculator__help">
                      {t("fields.bonus.help", { amount: fmt0(r.bonusAmount) })}
                    </p>
                  </Field>
                </>
              )}

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
                  className="cost-calculator__range cost-calculator__range--employee"
                  aria-valuemin={180}
                  aria-valuemax={260}
                  aria-valuenow={joursProductifs}
                />
                <p className="cost-calculator__help">{t("fields.productiveDays.help")}</p>
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

              {inclureAnnee1 && (
                <>
                  <Field label={t("fields.recruitment.label")} hint={`${recrutementPct} %`}>
                    <input
                      type="range"
                      min={0}
                      max={25}
                      step={1}
                      value={recrutementPct}
                      onChange={(e) => setRecrutementPct(Number(e.target.value))}
                      className="cost-calculator__range cost-calculator__range--employee"
                      aria-valuemin={0}
                      aria-valuemax={25}
                      aria-valuenow={recrutementPct}
                    />
                    <p className="cost-calculator__help">{t("fields.recruitment.help")}</p>
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
                      className="cost-calculator__range cost-calculator__range--employee"
                      aria-valuemin={0}
                      aria-valuemax={6}
                      aria-valuenow={onboardingMois}
                    />
                    <p className="cost-calculator__help">{t("fields.onboardingMonths.help")}</p>
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
                      className="cost-calculator__range cost-calculator__range--employee"
                      aria-valuemin={25}
                      aria-valuemax={100}
                      aria-valuenow={onboardingProductivite}
                    />
                    <p className="cost-calculator__help">
                      {t("fields.onboardingProductivity.help")}
                    </p>
                  </Field>
                </>
              )}
            </InputSection>

            <InputSection title={t("fields.autonomy.title")} lede={t("fields.autonomy.lede")}>
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
                    className="cost-calculator__range cost-calculator__range--employee"
                    aria-valuemin={0}
                    aria-valuemax={8}
                    aria-valuenow={heuresCoordination}
                  />
                  <p className="cost-calculator__help">{t("fields.coordination.help")}</p>
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
                    className="cost-calculator__range cost-calculator__range--employee"
                    aria-valuemin={0}
                    aria-valuemax={10000}
                    aria-valuenow={coutOutilsEmployeur}
                  />
                  <p className="cost-calculator__help">{t(`fields.tools.employee.help.${role}`)}</p>
                  <p className="cost-calculator__help cost-calculator__help--consultant">
                    {t("fields.tools.consultant.help")}
                  </p>
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
                  <div
                    className="cost-calculator__segmented"
                    role="group"
                    aria-label={t("fields.workplace.label")}
                  >
                    {WORKPLACE_MODE_LIST.map(({ mode, cost }) => (
                      <button
                        key={mode}
                        type="button"
                        onClick={() => setCoutMilieu(cost)}
                        className={classNames(
                          "cost-calculator__segment cost-calculator__segment--tier",
                          {
                            "cost-calculator__segment--active": activeWorkplaceMode === mode,
                          }
                        )}
                        aria-pressed={activeWorkplaceMode === mode}
                      >
                        <span className="cost-calculator__tier-name">
                          {t(`fields.workplace.options.${mode}`)}
                        </span>
                        <span className="cost-calculator__tier-rate">{fmt0(cost)}/an</span>
                      </button>
                    ))}
                  </div>
                  <p className="cost-calculator__help">{t("fields.workplace.help")}</p>
                  <p className="cost-calculator__help cost-calculator__help--consultant">
                    {t("fields.workplace.consultantHelp")}
                  </p>
                </Field>
              )}
            </InputSection>

            <InputSection title={t("fields.lifecycle.title")} lede={t("fields.lifecycle.lede")}>
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
                    className="cost-calculator__range cost-calculator__range--employee"
                    aria-valuemin={1}
                    aria-valuemax={8}
                    aria-valuenow={ancienneteAnnees}
                  />
                  <p className="cost-calculator__help">{t("fields.tenure.help")}</p>
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
                    className="cost-calculator__range cost-calculator__range--employee"
                    aria-valuemin={0}
                    aria-valuemax={26}
                    aria-valuenow={semainesFinEmploi}
                  />
                  <p className="cost-calculator__help">{t("fields.severance.help")}</p>
                </Field>
              )}
            </InputSection>
          </div>
        </div>

        <div className="cost-calculator__results">
          <div
            className={classNames("cost-calculator__hero", {
              "cost-calculator__hero--win": consultantWinsAnnual,
            })}
          >
            <div className="cost-calculator__hero-kicker">{t("results.verdict.kicker")}</div>
            {consultantWinsAnnual ? (
              <>
                <p className="cost-calculator__hero-headline">
                  {t(
                    cadenceIdeal
                      ? "results.verdict.ideal.headline"
                      : "results.verdict.ceiling.headline",
                    {
                      days: joursSemaine,
                      amount: fmt0(Math.abs(r.annualSaving)),
                      pct: savingPct,
                    }
                  )}
                </p>
                <p className="cost-calculator__hero-sub">
                  {t(cadenceIdeal ? "results.verdict.ideal.sub" : "results.verdict.ceiling.sub")}
                </p>
              </>
            ) : (
              <>
                <p className="cost-calculator__hero-headline">
                  {t("results.verdict.hire.headline")}
                </p>
                <p className="cost-calculator__hero-sub">{t("results.verdict.hire.sub")}</p>
              </>
            )}
            <ul className="cost-calculator__hero-points">
              <li className="cost-calculator__hero-point">{t("results.verdict.points.results")}</li>
              <li className="cost-calculator__hero-point">{t("results.verdict.points.speed")}</li>
              <li className="cost-calculator__hero-point">{t("results.verdict.points.flex")}</li>
            </ul>
            <p className="cost-calculator__hero-cap">{t("results.verdict.cap")}</p>

            <div className="cost-calculator__hero-annual">
              <div className="cost-calculator__panel-kicker">{t("results.annual.kicker")}</div>
              <div className="cost-calculator__stats cost-calculator__stats--pair">
                <Stat
                  label={t("results.annual.employeeLabel")}
                  value={fmt0(r.employeeAnnualCost)}
                  sub={t("results.annual.employeeSub")}
                  tone="employee"
                />
                <Stat
                  label={t("results.annual.consultantLabel", { days: joursSemaine })}
                  value={fmt0(r.consultantAnnualCost)}
                  sub={t("results.annual.consultantSub", {
                    workingWeeks: CONSULTANT_WORKING_WEEKS_PER_YEAR,
                    holidays: QUEBEC_STAT_HOLIDAYS,
                  })}
                  tone="consultant"
                />
              </div>
              <div className="cost-calculator__gap">
                <span>{t("results.annual.savingLabel")}</span>
                <span className="cost-calculator__gap-value">
                  {fmt0(Math.abs(r.annualSaving))}/an{" "}
                  <span
                    className={classNames("cost-calculator__gap-pct", {
                      "cost-calculator__gap-pct--consultant": r.annualSaving >= 0,
                      "cost-calculator__gap-pct--employee": r.annualSaving < 0,
                    })}
                  >
                    ({savingPct})
                  </span>
                </span>
              </div>
              <p className="cost-calculator__panel-note">
                {r.annualSaving >= 0
                  ? t("results.annual.savingConsultant", {
                      amount: fmt0(Math.abs(r.annualSaving)),
                      pct: savingPct,
                    })
                  : t("results.annual.savingEmployee", {
                      amount: fmt0(Math.abs(r.annualSaving)),
                      pct: savingPct,
                    })}
              </p>
              <p className="cost-calculator__panel-note cost-calculator__panel-note--muted">
                {t("results.taxes.note")}
              </p>
            </div>
          </div>

          <div className="cost-calculator__panel">
            <div className="cost-calculator__bars">
              <p className="cost-calculator__bars-title">{t("results.bars.kicker")}</p>
              <div className="cost-calculator__bar-row">
                <div className="cost-calculator__bar-head">
                  <span>{t("results.bars.consultant")}</span>
                  <span className="cost-calculator__bar-value cost-calculator__bar-value--consultant">
                    {fmt0(tarif)}/j
                  </span>
                </div>
                <div className="cost-calculator__bar-track">
                  <div
                    className="cost-calculator__bar-fill cost-calculator__bar-fill--consultant"
                    style={{ width: `${(tarif / maxBar) * 100}%` }}
                  />
                </div>
              </div>
              <div className="cost-calculator__bar-row">
                <div className="cost-calculator__bar-head">
                  <span>{t("results.bars.employeeSteady")}</span>
                  <span className="cost-calculator__bar-value cost-calculator__bar-value--employee">
                    {fmt0(r.steadyStateCostPerDay)}/j
                  </span>
                </div>
                <div className="cost-calculator__bar-track">
                  <div
                    className="cost-calculator__bar-fill cost-calculator__bar-fill--employee"
                    style={{ width: `${(r.steadyStateCostPerDay / maxBar) * 100}%` }}
                  />
                </div>
              </div>
              {friction && (
                <div className="cost-calculator__bar-row">
                  <div className="cost-calculator__bar-head">
                    <span>{t("results.bars.employeeYearOne")}</span>
                    <span className="cost-calculator__bar-value cost-calculator__bar-value--employee">
                      {fmt0(r.yearOneCostPerDay)}/j
                    </span>
                  </div>
                  <div className="cost-calculator__bar-track">
                    <div
                      className="cost-calculator__bar-fill cost-calculator__bar-fill--employee cost-calculator__bar-fill--year-one"
                      style={{ width: `${(r.yearOneCostPerDay / maxBar) * 100}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="cost-calculator__stats cost-calculator__stats--pair">
              <Stat
                label={t("results.dayCost.steadyLabel")}
                value={`${fmt0(r.steadyStateCostPerDay)}/j`}
                sub={t("results.dayCost.steadySub", { days: joursProductifs })}
                tone="employee"
              />
              {friction ? (
                <Stat
                  label={t("results.dayCost.yearOneLabel")}
                  value={`${fmt0(r.yearOneCostPerDay)}/j`}
                  sub={t("results.dayCost.yearOneSub", {
                    days: r.effectiveProductiveDays,
                    lost: friction.onboardingLostDays,
                  })}
                  tone="employee"
                />
              ) : (
                <Stat
                  label={t("results.dayCost.consultantLabel")}
                  value={`${fmt0(tarif)}/j`}
                  sub={t("results.dayCost.consultantSub", { days: joursSemaine })}
                  tone="consultant"
                />
              )}
            </div>
            <p className="cost-calculator__panel-note cost-calculator__panel-note--muted">
              {t("results.dayCost.note")}
            </p>

            {!modeCoutTotal && breakdown && (
              <BreakdownDetails title={t("results.breakdown.title", { year: breakdown.year })}>
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
              </BreakdownDetails>
            )}

            {autonomy &&
              (autonomy.coordinationAnnualCost > 0 ||
                autonomy.employeeToolsAnnualCost > 0 ||
                autonomy.workplaceAnnualCost > 0) && (
                <BreakdownDetails title={t("results.recurring.title")}>
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
                </BreakdownDetails>
              )}

            {lifecycle &&
              (lifecycle.amortizedRecruitmentCost > 0 || lifecycle.severanceAnnualCost > 0) && (
                <BreakdownDetails title={t("results.lifecycle.title")}>
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
                </BreakdownDetails>
              )}

            {friction && (
              <BreakdownDetails title={t("results.yearOne.title")}>
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
              </BreakdownDetails>
            )}
          </div>

          <div className="cost-calculator__note">
            <div className="cost-calculator__note-kicker">{t("results.autonomy.kicker")}</div>
            <p className="cost-calculator__note-text">{t("results.autonomy.text")}</p>
          </div>

          <div className="cost-calculator__note">
            <div className="cost-calculator__note-kicker">
              {t("results.consultantConsiderations.kicker")}
            </div>
            <p className="cost-calculator__note-text">
              {t("results.consultantConsiderations.text")}
            </p>
          </div>
        </div>
      </div>

      <p className="cost-calculator__disclaimer">
        {t("disclaimer", {
          workingWeeks: CONSULTANT_WORKING_WEEKS_PER_YEAR,
          holidays: QUEBEC_STAT_HOLIDAYS,
        })}
      </p>
    </div>
  );
}
