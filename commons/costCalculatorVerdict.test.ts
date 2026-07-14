import { consultantDayValueRatio, consultantWeeklyEquivalentDays } from "./costCalculatorYield";
import { resolveCalculatorVerdict } from "./costCalculatorVerdict";

describe("costCalculatorYield", () => {
  it("maps billed days to a realistic focus day-value ratio", () => {
    expect(consultantDayValueRatio(1)).toBe(1.5);
    expect(consultantDayValueRatio(2)).toBe(1.5);
    expect(consultantDayValueRatio(3)).toBe(1.7);
  });

  it("maps billed days to weekly CDI-equivalent yield", () => {
    expect(consultantWeeklyEquivalentDays(1)).toBe(1.5);
    expect(consultantWeeklyEquivalentDays(2)).toBe(3);
    expect(consultantWeeklyEquivalentDays(3)).toBe(5);
  });
});

describe("resolveCalculatorVerdict", () => {
  const baseCosts = {
    consultantAnnualCost: 84_600,
    employeeAnnualCost: 146_584,
    annualSaving: 146_584 - 84_600,
  };

  it("uses ideal tone for 1–2 d/wk when the consultant wins annually", () => {
    const verdict = resolveCalculatorVerdict({
      ...baseCosts,
      billedDaysPerWeek: 2,
    });
    expect(verdict.tone).toBe("ideal");
    expect(verdict.isFocusCeiling).toBe(false);
    expect(verdict.headlineKey).toBe("results.verdict.ideal.headline");
    expect(verdict.engagementSharePct).toBe(58);
    expect(verdict.weeklyEquivalentDays).toBe(3);
  });

  it("uses ceiling tone for 3 d/wk when the consultant wins annually", () => {
    const verdict = resolveCalculatorVerdict({
      consultantAnnualCost: 114_210,
      employeeAnnualCost: 146_584,
      annualSaving: 146_584 - 114_210,
      billedDaysPerWeek: 3,
    });
    expect(verdict.tone).toBe("ceiling");
    expect(verdict.isFocusCeiling).toBe(true);
    expect(verdict.headlineKey).toBe("results.verdict.ceiling.headline");
    expect(verdict.weeklyEquivalentDays).toBe(5);
  });

  it("uses hire tone when annual cost favors the employee", () => {
    const verdict = resolveCalculatorVerdict({
      consultantAnnualCost: 200_000,
      employeeAnnualCost: 146_584,
      annualSaving: 146_584 - 200_000,
      billedDaysPerWeek: 3,
    });
    expect(verdict.tone).toBe("hire");
    expect(verdict.consultantWinsAnnual).toBe(false);
    expect(verdict.isFocusCeiling).toBe(false);
    expect(verdict.headlineKey).toBe("results.verdict.hire.headline");
  });

  it("returns 0 engagement share when employee annual cost is 0", () => {
    const verdict = resolveCalculatorVerdict({
      consultantAnnualCost: 80_000,
      employeeAnnualCost: 0,
      annualSaving: 0,
      billedDaysPerWeek: 2,
    });
    expect(verdict.engagementSharePct).toBe(0);
  });
});
