/** @jest-environment node */
const { getSiteOrigin } = require("./siteOrigin");

describe("getSiteOrigin", () => {
  const originalDomain = process.env.NEXT_PUBLIC_DOMAIN;
  const originalTrusted = process.env.NEXT_PUBLIC_TRUSTED_HOSTS;

  afterEach(() => {
    process.env.NEXT_PUBLIC_DOMAIN = originalDomain;
    process.env.NEXT_PUBLIC_TRUSTED_HOSTS = originalTrusted;
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

  it("uses first value when x-forwarded-proto is a comma-separated list", () => {
    const req = {
      headers: { host: "lucrousseau.com", "x-forwarded-proto": "https, http" },
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

  it("rejects untrusted Host and uses NEXT_PUBLIC_DOMAIN when set", () => {
    process.env.NEXT_PUBLIC_DOMAIN = "https://staging.example.com";
    const req = { headers: { host: "evil.example" } };
    expect(getSiteOrigin(req)).toBe("https://staging.example.com");
  });

  it("rejects untrusted Host and uses default when NEXT_PUBLIC_DOMAIN unset", () => {
    delete process.env.NEXT_PUBLIC_DOMAIN;
    const req = { headers: { host: "evil.example" } };
    expect(getSiteOrigin(req)).toBe("https://lucrousseau.com");
  });

  it("allows www when apex is in fallback allowlist", () => {
    delete process.env.NEXT_PUBLIC_DOMAIN;
    const req = { headers: { host: "www.lucrousseau.com" } };
    expect(getSiteOrigin(req)).toBe("https://www.lucrousseau.com");
  });

  it("allows hostname from NEXT_PUBLIC_DOMAIN on incoming requests", () => {
    process.env.NEXT_PUBLIC_DOMAIN = "https://staging.example.com";
    const req = { headers: { host: "staging.example.com" } };
    expect(getSiteOrigin(req)).toBe("https://staging.example.com");
  });

  it("allows hosts listed in NEXT_PUBLIC_TRUSTED_HOSTS", () => {
    process.env.NEXT_PUBLIC_TRUSTED_HOSTS = "preview.vercel.app";
    const req = { headers: { host: "preview.vercel.app" } };
    expect(getSiteOrigin(req)).toBe("https://preview.vercel.app");
  });
});
