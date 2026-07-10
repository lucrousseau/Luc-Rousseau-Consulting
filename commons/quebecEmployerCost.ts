/**
 * Quebec employer payroll cost model (2026).
 * Sources: Revenu Québec TPZ-1015, RCGT Tax News 930R4 (Feb 2026), CNESST sector rates.
 * Indicative only; production payroll should use WebRAS or certified software.
 */

export const QUEBEC_EMPLOYER_COST_YEAR = 2026;

/** CNESST classification presets (2026 indicative sector rates). */
export const CNESST_SECTOR_RATES = {
  office: 0.0079,
  tech: 0.0079,
  retail: 0.0124,
  restaurant: 0.0201,
  transport: 0.0315,
  construction: 0.052,
} as const;

export type CnesstSector = keyof typeof CNESST_SECTOR_RATES;

export interface QuebecEmployerCostInput {
  grossSalary: number;
  /** Company total payroll in Quebec (determines FSS rate). */
  companyTotalPayroll?: number;
  cnesstSector?: CnesstSector;
  /** Employer-paid benefits as % of gross (insurance, RRSP, etc.). */
  benefitsPct?: number;
}

export interface QuebecEmployerCostLine {
  id: string;
  amount: number;
  rate?: number;
  base?: number;
}

export interface QuebecEmployerCostResult {
  year: number;
  grossSalary: number;
  mandatoryContributions: QuebecEmployerCostLine[];
  benefitsAmount: number;
  totalEmployerCost: number;
  mandatoryPct: number;
  benefitsPct: number;
  totalLoadPct: number;
  fssRate: number;
  cnesstRate: number;
}

const QPP_BASE_RATE = 0.063;
const QPP_MAX_PENSIONABLE = 74_600;
const QPP_ADDITIONAL_MAX = 85_000;
const QPP_ADDITIONAL_RATE = 0.04;
const QPP_BASIC_EXEMPTION = 3_500;

const EI_EMPLOYER_RATE = 0.0182;
const EI_MAX_INSURABLE = 68_900;

const QPIP_EMPLOYER_RATE = 0.00602;
const QPIP_MAX_INSURABLE = 103_000;

const CNT_RATE = 0.0006;
const CNT_MAX_EARNINGS = 103_000;

const CNESST_MAX_ASSESSABLE = 103_000;

const HSF_MAX_REDUCED_PAYROLL = 1_000_000;
const HSF_FULL_RATE_PAYROLL = 7_800_000;
const HSF_RATE_SMALL_OTHER = 0.0165;
const HSF_RATE_LARGE = 0.0426;

function roundMoney(value: number): number {
  return Math.round(value * 100) / 100;
}

function cappedAmount(salary: number, rate: number, maxEarnings?: number): number {
  const base = maxEarnings == null ? salary : Math.min(Math.max(salary, 0), maxEarnings);
  return roundMoney(Math.max(0, base) * rate);
}

/** FSS rate for non-primary/manufacturing employers (Revenu Québec 2026 table). */
export function getHsfRate(totalPayroll: number): number {
  const tp = Math.max(0, totalPayroll);

  if (tp <= HSF_MAX_REDUCED_PAYROLL) {
    return HSF_RATE_SMALL_OTHER;
  }

  if (tp >= HSF_FULL_RATE_PAYROLL) {
    return HSF_RATE_LARGE;
  }

  const ratePct = 1.2662 + (0.3838 * tp) / 1_000_000;
  return ratePct / 100;
}

export function computeQppEmployer(grossSalary: number): QuebecEmployerCostLine[] {
  const salary = Math.max(0, grossSalary);
  const pensionableBase = Math.max(0, Math.min(salary, QPP_MAX_PENSIONABLE) - QPP_BASIC_EXEMPTION);
  const qppBase = roundMoney(pensionableBase * QPP_BASE_RATE);

  const additionalBase = Math.max(0, Math.min(salary, QPP_ADDITIONAL_MAX) - QPP_MAX_PENSIONABLE);
  const qppAdditional = roundMoney(additionalBase * QPP_ADDITIONAL_RATE);

  const lines: QuebecEmployerCostLine[] = [
    {
      id: "qpp",
      amount: qppBase,
      rate: QPP_BASE_RATE,
      base: pensionableBase,
    },
  ];

  if (qppAdditional > 0) {
    lines.push({
      id: "qpp2",
      amount: qppAdditional,
      rate: QPP_ADDITIONAL_RATE,
      base: additionalBase,
    });
  }

  return lines;
}

export function computeQuebecMandatoryContributions(
  grossSalary: number,
  companyTotalPayroll: number,
  cnesstSector: CnesstSector = "office"
): QuebecEmployerCostLine[] {
  const salary = Math.max(0, grossSalary);
  const fssRate = getHsfRate(companyTotalPayroll);
  const cnesstRate = CNESST_SECTOR_RATES[cnesstSector];

  return [
    ...computeQppEmployer(salary),
    {
      id: "qpip",
      amount: cappedAmount(salary, QPIP_EMPLOYER_RATE, QPIP_MAX_INSURABLE),
      rate: QPIP_EMPLOYER_RATE,
      base: Math.min(salary, QPIP_MAX_INSURABLE),
    },
    {
      id: "ei",
      amount: cappedAmount(salary, EI_EMPLOYER_RATE, EI_MAX_INSURABLE),
      rate: EI_EMPLOYER_RATE,
      base: Math.min(salary, EI_MAX_INSURABLE),
    },
    {
      id: "hsf",
      amount: roundMoney(salary * fssRate),
      rate: fssRate,
      base: salary,
    },
    {
      id: "cnt",
      amount: cappedAmount(salary, CNT_RATE, CNT_MAX_EARNINGS),
      rate: CNT_RATE,
      base: Math.min(salary, CNT_MAX_EARNINGS),
    },
    {
      id: "cnesst",
      amount: cappedAmount(salary, cnesstRate, CNESST_MAX_ASSESSABLE),
      rate: cnesstRate,
      base: Math.min(salary, CNESST_MAX_ASSESSABLE),
    },
  ];
}

export function computeQuebecEmployerCost(
  input: QuebecEmployerCostInput
): QuebecEmployerCostResult {
  const grossSalary = Math.max(0, input.grossSalary);
  const companyTotalPayroll = input.companyTotalPayroll ?? 500_000;
  const cnesstSector = input.cnesstSector ?? "office";
  const benefitsPct = Math.max(0, input.benefitsPct ?? 6);

  const mandatoryContributions = computeQuebecMandatoryContributions(
    grossSalary,
    companyTotalPayroll,
    cnesstSector
  );
  const mandatoryTotal = roundMoney(
    mandatoryContributions.reduce((sum, line) => sum + line.amount, 0)
  );
  const benefitsAmount = roundMoney(grossSalary * (benefitsPct / 100));
  const totalEmployerCost = roundMoney(grossSalary + mandatoryTotal + benefitsAmount);

  return {
    year: QUEBEC_EMPLOYER_COST_YEAR,
    grossSalary,
    mandatoryContributions,
    benefitsAmount,
    totalEmployerCost,
    mandatoryPct: grossSalary > 0 ? roundMoney((mandatoryTotal / grossSalary) * 100) : 0,
    benefitsPct,
    totalLoadPct:
      grossSalary > 0 ? roundMoney(((mandatoryTotal + benefitsAmount) / grossSalary) * 100) : 0,
    fssRate: getHsfRate(companyTotalPayroll),
    cnesstRate: CNESST_SECTOR_RATES[cnesstSector],
  };
}
