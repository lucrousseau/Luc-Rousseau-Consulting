import classNames from "classnames";
import { useMemo, useState } from "react";
import { useTranslation } from "next-i18next/pages";
import { useRouter } from "next/router";
import type { ParsedUrlQuery } from "querystring";

import {
  BASE_CONSULTANT_DAY_RATE,
  DEFAULT_CALCULATOR_ROLE,
  WORKPLACE_ANNUAL_COST,
  getCalculatorRolePreset,
  getWorkplaceMode,
  parseBilledDaysQueryParam,
  parseCalculatorDeepLinkQuery,
  parseGrossSalaryQueryParam,
  type CalculatorDeepLinkSeed,
  type CalculatorRole,
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
  // Client-only mount (DayRateComparison dynamic ssr:false): seed once from location / router.
  const [deepLinkSeed] = useState(() => readDeepLinkSeed(router.query));
  const salaryFromQuery = deepLinkSeed.salary;
  const daysFromQuery = deepLinkSeed.billedDays;
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
  const [joursSemaineOverride, setJoursSemaineOverride] = useState<number | null>(null);
  const joursSemaine = joursSemaineOverride ?? daysFromQuery ?? rolePreset.defaultBilledDaysPerWeek;

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
                  onClick={() => setJoursSemaineOverride(d)}
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
            onChange={(value) => setSalaireOverride(value)}
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
