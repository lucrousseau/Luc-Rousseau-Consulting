/** @jest-environment node */
const { getSiteOrigin } = require("./siteOrigin");

describe("getSiteOrigin", () => {
  const originalEnv = process.env.NEXT_PUBLIC_DOMAIN;

  afterEach(() => {
    process.env.NEXT_PUBLIC_DOMAIN = originalEnv;
  });

  it("returns origin from req.headers.host with https when x-forwarded-proto is not set", () => {
    const req = { headers: { host: "lucrousseau.com" } };
    expect(getSiteOrigin(req)).toBe("https://lucrousseau.com");
  });

  it("returns origin from req.headers.host with x-forwarded-proto", () => {
    const req = {
      headers: { host: "lucrousseau.com", "x-forwarded-proto": "https" },
    };
    expect(getSiteOrigin(req)).toBe("https://lucrousseau.com");
  });

  it("uses http when x-forwarded-proto is http", () => {
    const req = {
      headers: { host: "localhost:3000", "x-forwarded-proto": "http" },
    };
    expect(getSiteOrigin(req)).toBe("http://localhost:3000");
  });

  it("strips trailing slash from host", () => {
    const req = { headers: { host: "lucrousseau.com/" } };
    expect(getSiteOrigin(req)).toBe("https://lucrousseau.com");
  });

  it("uses NEXT_PUBLIC_DOMAIN when no req and no window", () => {
    process.env.NEXT_PUBLIC_DOMAIN = "https://staging.example.com";
    expect(getSiteOrigin(null)).toBe("https://staging.example.com");
  });

  it("strips trailing slash from NEXT_PUBLIC_DOMAIN", () => {
    process.env.NEXT_PUBLIC_DOMAIN = "https://staging.example.com/";
    expect(getSiteOrigin(null)).toBe("https://staging.example.com");
  });

  it("falls back to default origin when no req and NEXT_PUBLIC_DOMAIN unset", () => {
    delete process.env.NEXT_PUBLIC_DOMAIN;
    expect(getSiteOrigin(null)).toBe("https://lucrousseau.com");
  });
});
