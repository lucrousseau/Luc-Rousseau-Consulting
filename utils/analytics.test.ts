const trackMock = jest.fn();

jest.mock("@vercel/analytics", () => ({
  track: (...args: unknown[]) => trackMock(...args),
}));

describe("analytics", () => {
  beforeEach(() => {
    trackMock.mockClear();
  });

  it("trackEventAsync forwards name and properties to Vercel track()", async () => {
    const { trackEventAsync } = await import("./analytics");
    await trackEventAsync("quiz_select", { section: "home-quiz", step: "root", option: "a" });

    expect(trackMock).toHaveBeenCalledWith("quiz_select", {
      section: "home-quiz",
      step: "root",
      option: "a",
    });
  });

  it("trackCtaClickAsync sends cta_click with section and optional props", async () => {
    const { trackCtaClickAsync } = await import("./analytics");
    await trackCtaClickAsync("contact", { page: "premier-dev-fractionnel" });

    expect(trackMock).toHaveBeenCalledWith("cta_click", {
      section: "contact",
      page: "premier-dev-fractionnel",
    });
  });
});
