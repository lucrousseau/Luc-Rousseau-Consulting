import classNames from "classnames";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "next-i18next/pages";
import { useRouter } from "next/router";
import type { ParsedUrlQuery } from "querystring";

import {
  BASE_CONSULTANT_DAY_RATE,
  DEFAULT_CALCULATOR_ROLE,
  WORKPLACE_ANNUAL_COST,
  calculatorRoleToSlug,
  getCalculatorRolePreset,
  getWorkplaceMode,
  parseBilledDaysQueryParam,
  parseCalculatorDeepLinkQuery,
  parseGrossSalaryQueryParam,
  type CalculatorDeepLinkSeed,
  type CalculatorRole,
} from "../../commons/costCalculatorPresets";
import {
  COST_CALCULATOR_SESSION_VERSION,
  loadCostCalculatorSession,
  saveCostCalculatorSession,
  type CostCalculatorSessionState,
} from "../../commons/costCalculatorSession";
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
import { EmployeeAdvancedInputs } from "./EmployeeAdvancedInputs";
import { EmployeeCostBreakdown } from "./EmployeeCostBreakdown";
import { CompareSide, Field, RangeField, SideTotals } from "./primitives";
import { BILLED_DAYS_OPTIONS, COST_CALCULATOR_SLIDERS } from "./sliders";
import { StickyVerdict } from "./StickyVerdict";

function createCurrencyFormatter(locale: string) {
  return new Intl.NumberFormat(locale === "en" ? "en-CA" : "fr-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  });
}

function seedFromRouterQuery(query: ParsedUrlQuery): CalculatorDeepLinkSeed {
  return {
    salary: parseGrossSalaryQueryParam(query.salaire ?? query.salary),
    billedDays: parseBilledDaysQueryParam(query.jours ?? query.days),
  };
}

function readDeepLinkSeed(query: ParsedUrlQuery): CalculatorDeepLinkSeed {
  const fromLocation =
    typeof window !== "undefined"
      ? parseCalculatorDeepLinkQuery(window.location.search)
      : { salary: null, billedDays: null };
  const fromRouter = seedFromRouterQuery(query);
  return {
    salary: fromLocation.salary ?? fromRouter.salary,
    billedDays: fromLocation.billedDays ?? fromRouter.billedDays,
  };
}

function buildInitialSessionState(
  role: CalculatorRole,
  query: ParsedUrlQuery
): CostCalculatorSessionState {
  const rolePreset = getCalculatorRolePreset(role);
  const deepLink = readDeepLinkSeed(query);
  const saved = loadCostCalculatorSession(role);

  // Session wins on reload (same tab). Deep-link seeds only when no session yet
  // (new tab / first visit), so shared URLs still work.
  return {
    v: COST_CALCULATOR_SESSION_VERSION,
    roleSlug: calculatorRoleToSlug(role),
    salaire: saved?.salaire ?? deepLink.salary ?? rolePreset.defaultGrossSalary,
    joursSemaine: saved?.joursSemaine ?? deepLink.billedDays ?? rolePreset.defaultBilledDaysPerWeek,
    masseSalariale: saved?.masseSalariale ?? rolePreset.defaultCompanyPayroll,
    avantagesPct: saved?.avantagesPct ?? rolePreset.defaultBenefitsPct,
    primePct: saved?.primePct ?? rolePreset.defaultBonusPct,
    joursProductifs: saved?.joursProductifs ?? rolePreset.defaultProductiveDays,
    inclureAnnee1: saved?.inclureAnnee1 ?? true,
    recrutementPct: saved?.recrutementPct ?? rolePreset.defaultRecruitmentPct,
    onboardingMois: saved?.onboardingMois ?? rolePreset.defaultOnboardingMonths,
    onboardingProductivite:
      saved?.onboardingProductivite ?? rolePreset.defaultOnboardingProductivity,
    inclureCoordination: saved?.inclureCoordination ?? true,
    heuresCoordination: saved?.heuresCoordination ?? rolePreset.defaultCoordinationHoursPerWeek,
    inclureOutilsEmployeur: saved?.inclureOutilsEmployeur ?? true,
    coutOutilsEmployeur: saved?.coutOutilsEmployeur ?? rolePreset.defaultEmployeeToolsAnnualCost,
    inclureMilieu: saved?.inclureMilieu ?? true,
    coutMilieu: saved?.coutMilieu ?? WORKPLACE_ANNUAL_COST[rolePreset.defaultWorkplaceMode],
    inclureRoulement: saved?.inclureRoulement ?? true,
    ancienneteAnnees: saved?.ancienneteAnnees ?? DEFAULT_AVERAGE_TENURE_YEARS,
    inclureFinEmploi: saved?.inclureFinEmploi ?? true,
    semainesFinEmploi: saved?.semainesFinEmploi ?? DEFAULT_SEVERANCE_WEEKS,
  };
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
  const [initial] = useState(() => buildInitialSessionState(role, router.query));

  const [salaire, setSalaire] = useState(initial.salaire);
  const [masseSalariale, setMasseSalariale] = useState(initial.masseSalariale);
  const [avantagesPct, setAvantagesPct] = useState(initial.avantagesPct);
  const [primePct, setPrimePct] = useState(initial.primePct);
  const [joursProductifs, setJoursProductifs] = useState(initial.joursProductifs);
  const [inclureAnnee1, setInclureAnnee1] = useState(initial.inclureAnnee1);
  const [recrutementPct, setRecrutementPct] = useState(initial.recrutementPct);
  const [onboardingMois, setOnboardingMois] = useState(initial.onboardingMois);
  const [onboardingProductivite, setOnboardingProductivite] = useState(
    initial.onboardingProductivite
  );
  const [inclureCoordination, setInclureCoordination] = useState(initial.inclureCoordination);
  const [heuresCoordination, setHeuresCoordination] = useState(initial.heuresCoordination);
  const [inclureOutilsEmployeur, setInclureOutilsEmployeur] = useState(
    initial.inclureOutilsEmployeur
  );
  const [coutOutilsEmployeur, setCoutOutilsEmployeur] = useState(initial.coutOutilsEmployeur);
  const [inclureMilieu, setInclureMilieu] = useState(initial.inclureMilieu);
  const [coutMilieu, setCoutMilieu] = useState(initial.coutMilieu);
  const [inclureRoulement, setInclureRoulement] = useState(initial.inclureRoulement);
  const [ancienneteAnnees, setAncienneteAnnees] = useState(initial.ancienneteAnnees);
  const [inclureFinEmploi, setInclureFinEmploi] = useState(initial.inclureFinEmploi);
  const [semainesFinEmploi, setSemainesFinEmploi] = useState(initial.semainesFinEmploi);
  const [joursSemaine, setJoursSemaine] = useState(initial.joursSemaine);

  useEffect(() => {
    saveCostCalculatorSession(role, {
      v: COST_CALCULATOR_SESSION_VERSION,
      salaire,
      joursSemaine,
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
    });
  }, [
    role,
    salaire,
    joursSemaine,
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
  ]);

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
      <StickyVerdict
        t={t}
        verdict={verdict}
        billedDaysPerWeek={joursSemaine}
        equivalentLabel={equivalentLabel}
        consultantAnnualLabel={fmt0(r.consultantAnnualCost)}
        employeeAnnualLabel={fmt0(r.employeeAnnualCost)}
      />

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
              {BILLED_DAYS_OPTIONS.map((d) => (
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
            {r.volumeDiscountPct > 0 ? (
              <p className="cost-calculator__help">
                {t("fields.billedDays.volumeDiscount", {
                  pct: r.volumeDiscountPct,
                  rate: fmt0(r.effectiveConsultantDayRate),
                })}
              </p>
            ) : null}
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
              <EmployeeCostBreakdown
                t={t}
                result={r}
                onboardingMonths={onboardingMois}
                onboardingProductivity={onboardingProductivite}
                fmt0={fmt0}
                pct1={pct1}
              />
            </>
          }
        >
          <RangeField
            label={t("fields.salary.label")}
            hint={fmt0(salaire)}
            value={salaire}
            onChange={setSalaire}
            {...COST_CALCULATOR_SLIDERS.salary}
          />
          <EmployeeAdvancedInputs
            t={t}
            fmt0={fmt0}
            companyPayroll={masseSalariale}
            setCompanyPayroll={setMasseSalariale}
            benefitsPct={avantagesPct}
            setBenefitsPct={setAvantagesPct}
            bonusPct={primePct}
            setBonusPct={setPrimePct}
            productiveDays={joursProductifs}
            setProductiveDays={setJoursProductifs}
            includeYearOne={inclureAnnee1}
            setIncludeYearOne={setInclureAnnee1}
            recruitmentPct={recrutementPct}
            setRecruitmentPct={setRecrutementPct}
            onboardingMonths={onboardingMois}
            setOnboardingMonths={setOnboardingMois}
            onboardingProductivity={onboardingProductivite}
            setOnboardingProductivity={setOnboardingProductivite}
            includeCoordination={inclureCoordination}
            setIncludeCoordination={setInclureCoordination}
            coordinationHours={heuresCoordination}
            setCoordinationHours={setHeuresCoordination}
            includeEmployeeTools={inclureOutilsEmployeur}
            setIncludeEmployeeTools={setInclureOutilsEmployeur}
            employeeToolsCost={coutOutilsEmployeur}
            setEmployeeToolsCost={setCoutOutilsEmployeur}
            includeWorkplace={inclureMilieu}
            setIncludeWorkplace={setInclureMilieu}
            workplaceCost={coutMilieu}
            setWorkplaceCost={setCoutMilieu}
            activeWorkplaceMode={activeWorkplaceMode}
            includeTurnover={inclureRoulement}
            setIncludeTurnover={setInclureRoulement}
            tenureYears={ancienneteAnnees}
            setTenureYears={setAncienneteAnnees}
            includeSeverance={inclureFinEmploi}
            setIncludeSeverance={setInclureFinEmploi}
            severanceWeeks={semainesFinEmploi}
            setSeveranceWeeks={setSemainesFinEmploi}
          />
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
