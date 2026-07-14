import { BILLABLE_WEEKS_PER_YEAR } from "./dayRateComparison";
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
  it("stays ideal and prices the proof line on year-1 × yield cadence", () => {
    // 900 ≤ 701 × 1.5 = 1_051.5; annual CDI slice = 701 × 1.5 × 47
    const yieldEquivalentCdiAnnual = Math.round(701 * 1.5 * BILLABLE_WEEKS_PER_YEAR);
    const verdict = resolveCalculatorVerdict({
      consultantAnnualCost: 42_300,
      effectiveConsultantDayRate: 900,
      yearOneCostPerDay: 701,
      billedDaysPerWeek: 1,
    });
    expect(verdict.consultantWinsOnYield).toBe(true);
    expect(verdict.tone).toBe("ideal");
    expect(verdict.yieldEquivalentCdiAnnual).toBe(yieldEquivalentCdiAnnual);
    expect(verdict.engagementSharePct).toBe(Math.round((42_300 / yieldEquivalentCdiAnnual) * 100));
    expect(verdict.weeklyEquivalentDays).toBe(1.5);
  });

  it("uses hire tone when TJM exceeds year-1 CDI day cost × yield ratio", () => {
    const verdict = resolveCalculatorVerdict({
      consultantAnnualCost: 56_400,
      effectiveConsultantDayRate: 1_200,
      yearOneCostPerDay: 701,
      billedDaysPerWeek: 1,
    });
    expect(verdict.consultantWinsOnYield).toBe(false);
    expect(verdict.tone).toBe("hire");
    expect(verdict.headlineKey).toBe("results.verdict.hire.headline");
  });

  it("uses ideal tone for 1–2 d/wk when TJM beats the yield-adjusted CDI day cost", () => {
    const verdict = resolveCalculatorVerdict({
      consultantAnnualCost: 84_600,
      effectiveConsultantDayRate: 900,
      yearOneCostPerDay: 690,
      billedDaysPerWeek: 2,
    });
    expect(verdict.tone).toBe("ideal");
    expect(verdict.consultantWinsOnYield).toBe(true);
    expect(verdict.yieldEquivalentCdiAnnual).toBe(Math.round(690 * 3 * BILLABLE_WEEKS_PER_YEAR));
    expect(verdict.weeklyEquivalentDays).toBe(3);
  });

  it("uses ceiling tone for 3 d/wk when discounted TJM beats yield-adjusted CDI day cost", () => {
    const verdict = resolveCalculatorVerdict({
      consultantAnnualCost: 114_210,
      effectiveConsultantDayRate: 810,
      yearOneCostPerDay: 690,
      billedDaysPerWeek: 3,
    });
    expect(verdict.tone).toBe("ceiling");
    expect(verdict.consultantWinsOnYield).toBe(true);
    expect(verdict.isFocusCeiling).toBe(true);
    expect(verdict.yieldEquivalentCdiAnnual).toBe(Math.round(690 * 5 * BILLABLE_WEEKS_PER_YEAR));
  });

  it("returns 0 engagement share when year-1 day cost is 0", () => {
    const verdict = resolveCalculatorVerdict({
      consultantAnnualCost: 80_000,
      effectiveConsultantDayRate: 900,
      yearOneCostPerDay: 0,
      billedDaysPerWeek: 2,
    });
    expect(verdict.engagementSharePct).toBe(0);
    expect(verdict.yieldEquivalentCdiAnnual).toBe(0);
    expect(verdict.consultantWinsOnYield).toBe(false);
  });
});
