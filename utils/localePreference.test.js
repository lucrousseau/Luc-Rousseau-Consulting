/** @jest-environment node */
const {
  isLikelyBot,
  preferredLocaleFromAcceptLanguage,
  localeFromCookieValue,
  localeFromDocumentCookie,
} = require("./localePreference");

describe("isLikelyBot", () => {
  it("detects Googlebot", () => {
    expect(isLikelyBot("Mozilla/5.0 (compatible; Googlebot/2.1)")).toBe(true);
  });

  it("detects Google-InspectionTool", () => {
    expect(isLikelyBot("Mozilla/5.0 (compatible; Google-InspectionTool/1.0)")).toBe(true);
  });

  it("detects Chrome-Lighthouse", () => {
    expect(isLikelyBot("Mozilla/5.0 Chrome-Lighthouse")).toBe(true);
  });

  it("returns false for normal Chrome", () => {
    expect(
      isLikelyBot(
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      )
    ).toBe(false);
  });

  it("returns false for empty UA", () => {
    expect(isLikelyBot("")).toBe(false);
    expect(isLikelyBot(undefined)).toBe(false);
  });
});

describe("preferredLocaleFromAcceptLanguage", () => {
  it("maps en-US", () => {
    expect(preferredLocaleFromAcceptLanguage("en-US,en;q=0.9,fr;q=0.8")).toBe("en");
  });

  it("maps fr-CA", () => {
    expect(preferredLocaleFromAcceptLanguage("fr-CA,fr;q=0.9,en;q=0.8")).toBe("fr");
  });

  it("returns null for unsupported language", () => {
    expect(preferredLocaleFromAcceptLanguage("de-DE,de;q=0.9")).toBe(null);
  });

  it("returns null for missing header", () => {
    expect(preferredLocaleFromAcceptLanguage(null)).toBe(null);
  });
});

describe("localeFromCookieValue", () => {
  it("accepts en and fr", () => {
    expect(localeFromCookieValue("en")).toBe("en");
    expect(localeFromCookieValue("fr")).toBe("fr");
  });

  it("rejects invalid values", () => {
    expect(localeFromCookieValue("de")).toBe(null);
    expect(localeFromCookieValue("")).toBe(null);
  });
});

describe("localeFromDocumentCookie", () => {
  it("parses lrc-locale from cookie string", () => {
    expect(localeFromDocumentCookie("lrc-locale=en; Path=/")).toBe("en");
    expect(localeFromDocumentCookie("foo=bar; lrc-locale=fr; Path=/")).toBe("fr");
  });

  it("returns null when absent", () => {
    expect(localeFromDocumentCookie("other=1")).toBe(null);
  });
});
