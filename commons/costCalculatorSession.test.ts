import {
  COST_CALCULATOR_SESSION_VERSION,
  costCalculatorSessionKey,
  loadCostCalculatorSession,
  parseCostCalculatorSession,
  saveCostCalculatorSession,
} from "./costCalculatorSession";

const validDraft = {
  v: COST_CALCULATOR_SESSION_VERSION,
  roleSlug: "dev",
  salaire: 80_000,
  joursSemaine: 3,
  masseSalariale: 1_000_000,
  avantagesPct: 5,
  primePct: 5,
  joursProductifs: 215,
  inclureAnnee1: true,
  recrutementPct: 10,
  onboardingMois: 2,
  onboardingProductivite: 60,
  inclureCoordination: true,
  heuresCoordination: 1,
  inclureOutilsEmployeur: true,
  coutOutilsEmployeur: 3_500,
  inclureMilieu: true,
  coutMilieu: 2_500,
  inclureRoulement: true,
  ancienneteAnnees: 3,
  inclureFinEmploi: true,
  semainesFinEmploi: 4,
} as const;

describe("costCalculatorSession", () => {
  beforeEach(() => {
    window.sessionStorage.clear();
  });

  it("uses distinct storage keys for dev and pm", () => {
    expect(costCalculatorSessionKey("developer")).toBe("luc-cost-calculator:v1:dev");
    expect(costCalculatorSessionKey("productManager")).toBe("luc-cost-calculator:v1:pm");
  });

  it("round-trips a valid draft through sessionStorage", () => {
    saveCostCalculatorSession("developer", { ...validDraft });
    expect(loadCostCalculatorSession("developer")).toEqual({
      ...validDraft,
      roleSlug: "dev",
    });
    expect(window.sessionStorage.getItem(costCalculatorSessionKey("developer"))).toContain("80000");
  });

  it("keeps drafts scoped per calculator role", () => {
    saveCostCalculatorSession("developer", { ...validDraft, salaire: 80_000 });
    saveCostCalculatorSession("productManager", {
      ...validDraft,
      roleSlug: "pm",
      salaire: 120_000,
    });

    expect(loadCostCalculatorSession("developer")?.salaire).toBe(80_000);
    expect(loadCostCalculatorSession("productManager")?.salaire).toBe(120_000);
    expect(loadCostCalculatorSession("developer")?.roleSlug).toBe("dev");
    expect(loadCostCalculatorSession("productManager")?.roleSlug).toBe("pm");
  });

  it("rejects corrupt, outdated, or cross-role payloads", () => {
    expect(parseCostCalculatorSession(null, "developer")).toBeNull();
    expect(parseCostCalculatorSession({ ...validDraft, v: 0 }, "developer")).toBeNull();
    expect(parseCostCalculatorSession({ ...validDraft, joursSemaine: 9 }, "developer")).toBeNull();
    expect(parseCostCalculatorSession({ ...validDraft, salaire: "nope" }, "developer")).toBeNull();
    expect(parseCostCalculatorSession({ ...validDraft, roleSlug: "pm" }, "developer")).toBeNull();
  });
});
