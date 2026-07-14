import type { TFunction } from "i18next";

import {
  WORKPLACE_ANNUAL_COST,
  WORKPLACE_MODE_LIST,
  type WorkplaceMode,
} from "../../commons/costCalculatorPresets";
import { CheckboxField, Field, InputSection, RangeField } from "./primitives";
import { COST_CALCULATOR_SLIDERS } from "./sliders";

interface EmployeeAdvancedInputsProps {
  t: TFunction;
  fmt0: (n: number) => string;
  companyPayroll: number;
  setCompanyPayroll: (value: number) => void;
  benefitsPct: number;
  setBenefitsPct: (value: number) => void;
  bonusPct: number;
  setBonusPct: (value: number) => void;
  productiveDays: number;
  setProductiveDays: (value: number) => void;
  includeYearOne: boolean;
  setIncludeYearOne: (value: boolean) => void;
  recruitmentPct: number;
  setRecruitmentPct: (value: number) => void;
  onboardingMonths: number;
  setOnboardingMonths: (value: number) => void;
  onboardingProductivity: number;
  setOnboardingProductivity: (value: number) => void;
  includeCoordination: boolean;
  setIncludeCoordination: (value: boolean) => void;
  coordinationHours: number;
  setCoordinationHours: (value: number) => void;
  includeEmployeeTools: boolean;
  setIncludeEmployeeTools: (value: boolean) => void;
  employeeToolsCost: number;
  setEmployeeToolsCost: (value: number) => void;
  includeWorkplace: boolean;
  setIncludeWorkplace: (value: boolean) => void;
  workplaceCost: number;
  setWorkplaceCost: (value: number) => void;
  activeWorkplaceMode: WorkplaceMode | null;
  includeTurnover: boolean;
  setIncludeTurnover: (value: boolean) => void;
  tenureYears: number;
  setTenureYears: (value: number) => void;
  includeSeverance: boolean;
  setIncludeSeverance: (value: boolean) => void;
  severanceWeeks: number;
  setSeveranceWeeks: (value: number) => void;
}

export function EmployeeAdvancedInputs({
  t,
  fmt0,
  companyPayroll,
  setCompanyPayroll,
  benefitsPct,
  setBenefitsPct,
  bonusPct,
  setBonusPct,
  productiveDays,
  setProductiveDays,
  includeYearOne,
  setIncludeYearOne,
  recruitmentPct,
  setRecruitmentPct,
  onboardingMonths,
  setOnboardingMonths,
  onboardingProductivity,
  setOnboardingProductivity,
  includeCoordination,
  setIncludeCoordination,
  coordinationHours,
  setCoordinationHours,
  includeEmployeeTools,
  setIncludeEmployeeTools,
  employeeToolsCost,
  setEmployeeToolsCost,
  includeWorkplace,
  setIncludeWorkplace,
  workplaceCost,
  setWorkplaceCost,
  activeWorkplaceMode,
  includeTurnover,
  setIncludeTurnover,
  tenureYears,
  setTenureYears,
  includeSeverance,
  setIncludeSeverance,
  severanceWeeks,
  setSeveranceWeeks,
}: EmployeeAdvancedInputsProps) {
  return (
    <div className="cost-calculator__advanced">
      <p className="cost-calculator__advanced-label">{t("fields.advanced.label")}</p>

      <InputSection title={t("fields.employeeCost.title")}>
        <RangeField
          label={t("fields.companyPayroll.label")}
          hint={fmt0(companyPayroll)}
          value={companyPayroll}
          onChange={setCompanyPayroll}
          {...COST_CALCULATOR_SLIDERS.companyPayroll}
        />
        <RangeField
          label={t("fields.benefits.label")}
          hint={`${benefitsPct} %`}
          value={benefitsPct}
          onChange={setBenefitsPct}
          {...COST_CALCULATOR_SLIDERS.benefitsPct}
        />
        <RangeField
          label={t("fields.bonus.label")}
          hint={`${bonusPct} %`}
          value={bonusPct}
          onChange={setBonusPct}
          {...COST_CALCULATOR_SLIDERS.bonusPct}
        />
        <RangeField
          label={t("fields.productiveDays.label")}
          hint={t("fields.productiveDays.hint", { count: productiveDays })}
          value={productiveDays}
          onChange={setProductiveDays}
          {...COST_CALCULATOR_SLIDERS.productiveDays}
        />
      </InputSection>

      <InputSection title={t("fields.yearOne.title")}>
        <CheckboxField
          checked={includeYearOne}
          onChange={setIncludeYearOne}
          label={t("fields.yearOne.include")}
        />
        {(includeYearOne || includeTurnover) && (
          <>
            <RangeField
              label={t("fields.recruitment.label")}
              hint={`${recruitmentPct} %`}
              value={recruitmentPct}
              onChange={setRecruitmentPct}
              {...COST_CALCULATOR_SLIDERS.recruitmentPct}
            />
            <RangeField
              label={t("fields.onboardingMonths.label")}
              hint={t("fields.onboardingMonths.hint", { count: onboardingMonths })}
              value={onboardingMonths}
              onChange={setOnboardingMonths}
              {...COST_CALCULATOR_SLIDERS.onboardingMonths}
            />
            <RangeField
              label={t("fields.onboardingProductivity.label")}
              hint={`${onboardingProductivity} %`}
              value={onboardingProductivity}
              onChange={setOnboardingProductivity}
              {...COST_CALCULATOR_SLIDERS.onboardingProductivity}
            />
          </>
        )}
      </InputSection>

      <InputSection title={t("fields.autonomy.title")}>
        <CheckboxField
          checked={includeCoordination}
          onChange={setIncludeCoordination}
          label={t("fields.autonomy.include")}
        />
        {includeCoordination ? (
          <RangeField
            label={t("fields.coordination.label")}
            hint={t("fields.coordination.hint", { count: coordinationHours })}
            value={coordinationHours}
            onChange={setCoordinationHours}
            {...COST_CALCULATOR_SLIDERS.coordinationHours}
          />
        ) : null}

        <CheckboxField
          checked={includeEmployeeTools}
          onChange={setIncludeEmployeeTools}
          label={t("fields.tools.includeEmployee")}
        />
        {includeEmployeeTools ? (
          <RangeField
            label={t("fields.tools.employee.label")}
            hint={fmt0(employeeToolsCost)}
            value={employeeToolsCost}
            onChange={setEmployeeToolsCost}
            {...COST_CALCULATOR_SLIDERS.employeeTools}
          />
        ) : null}

        <CheckboxField
          checked={includeWorkplace}
          onChange={setIncludeWorkplace}
          label={t("fields.workplace.include")}
        />
        {includeWorkplace ? (
          <Field label={t("fields.workplace.label")} hint={fmt0(workplaceCost)}>
            <select
              className="cost-calculator__select"
              value={activeWorkplaceMode ?? "hybrid"}
              aria-label={t("fields.workplace.label")}
              onChange={(e) =>
                setWorkplaceCost(WORKPLACE_ANNUAL_COST[e.target.value as WorkplaceMode])
              }
            >
              {WORKPLACE_MODE_LIST.map(({ mode, cost }) => (
                <option key={mode} value={mode}>
                  {t(`fields.workplace.options.${mode}`)} · {fmt0(cost)}/an
                </option>
              ))}
            </select>
          </Field>
        ) : null}
      </InputSection>

      <InputSection title={t("fields.lifecycle.title")}>
        <CheckboxField
          checked={includeTurnover}
          onChange={setIncludeTurnover}
          label={t("fields.turnover.include")}
        />
        {(includeTurnover || includeSeverance) && (
          <RangeField
            label={t("fields.tenure.label")}
            hint={t("fields.tenure.hint", { count: tenureYears })}
            value={tenureYears}
            onChange={setTenureYears}
            {...COST_CALCULATOR_SLIDERS.tenureYears}
          />
        )}
        <CheckboxField
          checked={includeSeverance}
          onChange={setIncludeSeverance}
          label={t("fields.severance.include")}
        />
        {includeSeverance ? (
          <RangeField
            label={t("fields.severance.label")}
            hint={t("fields.severance.hint", { count: severanceWeeks })}
            value={severanceWeeks}
            onChange={setSeveranceWeeks}
            {...COST_CALCULATOR_SLIDERS.severanceWeeks}
          />
        ) : null}
      </InputSection>
    </div>
  );
}
