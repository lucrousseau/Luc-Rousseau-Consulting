const trackMock = jest.fn();

jest.mock("@vercel/analytics", () => ({
  track: (...args: unknown[]) => trackMock(...args),
}));

describe("analytics", () => {
  beforeEach(() => {
    trackMock.mockClear();
  });

  it("analyticsText collapses whitespace and truncates long values", async () => {
    const { analyticsText } = await import("./analytics");
    expect(analyticsText("  hello   world  ")).toBe("hello world");
    expect(analyticsText("")).toBeUndefined();
    expect(analyticsText(null)).toBeUndefined();
    const long = "a".repeat(300);
    const truncated = analyticsText(long);
    expect(truncated).toHaveLength(255);
    expect(truncated?.endsWith("…")).toBe(true);
  });

  it("analyticsProps folds page into section and keeps a detail slot", async () => {
    const { analyticsProps } = await import("./analytics");
    expect(analyticsProps("faq", { item: "Délai de démarrage ?" })).toEqual({
      section: "faq",
      item: "Délai de démarrage ?",
    });
    expect(
      analyticsProps("situation-faq", {
        page: "premier-dev-fractionnel",
        item: "Combien de jours ?",
      })
    ).toEqual({
      section: "situation-faq · premier-dev-fractionnel",
      item: "Combien de jours ?",
    });
  });

  it("trackEventAsync forwards name and sanitized properties to Vercel track()", async () => {
    const { trackEventAsync } = await import("./analytics");
    await trackEventAsync("quiz_select", {
      section: "home-quiz",
      choice: "Q1 · Quelle situation ? · Premier dev",
    });

    expect(trackMock).toHaveBeenCalledWith("quiz_select", {
      section: "home-quiz",
      choice: "Q1 · Quelle situation ? · Premier dev",
    });
  });

  it("trackCtaClickAsync sends cta_click with readable section and label", async () => {
    const { trackCtaClickAsync } = await import("./analytics");
    await trackCtaClickAsync("contact", {
      page: "premier-dev-fractionnel",
      label: "Réserver un appel",
    });

    expect(trackMock).toHaveBeenCalledWith("cta_click", {
      section: "contact · premier-dev-fractionnel",
      label: "Réserver un appel",
    });
  });

  it("accordion open props fold page into section and use the item title", async () => {
    const { analyticsProps } = await import("./analytics");
    expect(
      analyticsProps("faq", {
        item: "Quel est le délai ?",
        page: "home",
      })
    ).toEqual({
      section: "faq · home",
      item: "Quel est le délai ?",
    });
  });
});
