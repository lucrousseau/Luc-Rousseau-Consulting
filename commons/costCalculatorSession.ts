import {
  BILLED_DAYS_QUERY_OPTIONS,
  calculatorRoleToSlug,
  parseBilledDaysQueryParam,
  parseGrossSalaryQueryParam,
  type CalculatorRole,
} from "./costCalculatorPresets";

export const COST_CALCULATOR_SESSION_VERSION = 1 as const;

export interface CostCalculatorSessionState {
  v: typeof COST_CALCULATOR_SESSION_VERSION;
  /** Public slug (`dev` | `pm`) so drafts never cross profiles. */
  roleSlug: string;
  salaire: number;
  joursSemaine: number;
  masseSalariale: number;
  avantagesPct: number;
  primePct: number;
  joursProductifs: number;
  inclureAnnee1: boolean;
  recrutementPct: number;
  onboardingMois: number;
  onboardingProductivite: number;
  inclureCoordination: boolean;
  heuresCoordination: number;
  inclureOutilsEmployeur: boolean;
  coutOutilsEmployeur: number;
  inclureMilieu: boolean;
  coutMilieu: number;
  inclureRoulement: boolean;
  ancienneteAnnees: number;
  inclureFinEmploi: boolean;
  semainesFinEmploi: number;
}

/** One sessionStorage key per public calculator profile (`…:dev`, `…:pm`). */
export function costCalculatorSessionKey(role: CalculatorRole): string {
  return `luc-cost-calculator:v${COST_CALCULATOR_SESSION_VERSION}:${calculatorRoleToSlug(role)}`;
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

function isBoolean(value: unknown): value is boolean {
  return typeof value === "boolean";
}

/** Validates and normalizes a stored draft; returns null if unusable or role-mismatched. */
export function parseCostCalculatorSession(
  raw: unknown,
  expectedRole: CalculatorRole
): CostCalculatorSessionState | null {
  if (raw == null || typeof raw !== "object") {
    return null;
  }

  const data = raw as Record<string, unknown>;
  if (data.v !== COST_CALCULATOR_SESSION_VERSION) {
    return null;
  }

  const expectedSlug = calculatorRoleToSlug(expectedRole);
  if (data.roleSlug !== expectedSlug) {
    return null;
  }

  const salaire = parseGrossSalaryQueryParam(String(data.salaire ?? ""));
  const joursSemaine = parseBilledDaysQueryParam(String(data.joursSemaine ?? ""));
  if (salaire == null || joursSemaine == null) {
    return null;
  }

  if (
    !isFiniteNumber(data.masseSalariale) ||
    !isFiniteNumber(data.avantagesPct) ||
    !isFiniteNumber(data.primePct) ||
    !isFiniteNumber(data.joursProductifs) ||
    !isBoolean(data.inclureAnnee1) ||
    !isFiniteNumber(data.recrutementPct) ||
    !isFiniteNumber(data.onboardingMois) ||
    !isFiniteNumber(data.onboardingProductivite) ||
    !isBoolean(data.inclureCoordination) ||
    !isFiniteNumber(data.heuresCoordination) ||
    !isBoolean(data.inclureOutilsEmployeur) ||
    !isFiniteNumber(data.coutOutilsEmployeur) ||
    !isBoolean(data.inclureMilieu) ||
    !isFiniteNumber(data.coutMilieu) ||
    !isBoolean(data.inclureRoulement) ||
    !isFiniteNumber(data.ancienneteAnnees) ||
    !isBoolean(data.inclureFinEmploi) ||
    !isFiniteNumber(data.semainesFinEmploi)
  ) {
    return null;
  }

  if (!(BILLED_DAYS_QUERY_OPTIONS as readonly number[]).includes(joursSemaine)) {
    return null;
  }

  return {
    v: COST_CALCULATOR_SESSION_VERSION,
    roleSlug: expectedSlug,
    salaire,
    joursSemaine,
    masseSalariale: data.masseSalariale,
    avantagesPct: data.avantagesPct,
    primePct: data.primePct,
    joursProductifs: data.joursProductifs,
    inclureAnnee1: data.inclureAnnee1,
    recrutementPct: data.recrutementPct,
    onboardingMois: data.onboardingMois,
    onboardingProductivite: data.onboardingProductivite,
    inclureCoordination: data.inclureCoordination,
    heuresCoordination: data.heuresCoordination,
    inclureOutilsEmployeur: data.inclureOutilsEmployeur,
    coutOutilsEmployeur: data.coutOutilsEmployeur,
    inclureMilieu: data.inclureMilieu,
    coutMilieu: data.coutMilieu,
    inclureRoulement: data.inclureRoulement,
    ancienneteAnnees: data.ancienneteAnnees,
    inclureFinEmploi: data.inclureFinEmploi,
    semainesFinEmploi: data.semainesFinEmploi,
  };
}

export function loadCostCalculatorSession(role: CalculatorRole): CostCalculatorSessionState | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.sessionStorage.getItem(costCalculatorSessionKey(role));
    if (raw == null || raw === "") {
      return null;
    }
    return parseCostCalculatorSession(JSON.parse(raw), role);
  } catch {
    return null;
  }
}

export function saveCostCalculatorSession(
  role: CalculatorRole,
  state: Omit<CostCalculatorSessionState, "roleSlug" | "v"> &
    Partial<Pick<CostCalculatorSessionState, "roleSlug" | "v">>
): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const payload: CostCalculatorSessionState = {
      ...state,
      v: COST_CALCULATOR_SESSION_VERSION,
      roleSlug: calculatorRoleToSlug(role),
    };
    window.sessionStorage.setItem(costCalculatorSessionKey(role), JSON.stringify(payload));
  } catch {
    // Private mode / quota: ignore persistence.
  }
}
