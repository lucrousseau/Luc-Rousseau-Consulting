import {
  getRouteAlternateUrls,
  getSituationAlternateUrls,
  ROUTES,
  getSituationPathById,
  normalizeAppPathname,
  resolveInternalLinkPath,
  resolveLocaleSwitchPath,
} from "./siteRoutes";
import { SITUATIONS } from "./situationsManifest";

const base = "https://lucrousseau.com";
const defaultLocale = "fr";

describe("siteRoutes", () => {
  it("exposes static route constants", () => {
    expect(ROUTES.situationsHub).toBe("/situations");
    expect(ROUTES.services).toBe("/services");
  });

  it("normalizes legacy locale-prefixed paths", () => {
    expect(normalizeAppPathname("/en/situations/post-funding-first-developer")).toBe(
      "/situations/post-funding-first-developer"
    );
    expect(normalizeAppPathname("/en/situations?quiz=1#result")).toBe("/situations");
  });

  it("resolves situation hub and static routes", () => {
    expect(resolveInternalLinkPath("/situations", "en")).toBe("/situations");
    expect(resolveInternalLinkPath("/en/situations", "fr")).toBe("/situations");
    expect(resolveInternalLinkPath("/services", "en")).toBe("/services");
    expect(resolveInternalLinkPath("/", "en")).toBe("/");
  });

  it("maps situation id slug to locale-specific path", () => {
    expect(resolveInternalLinkPath("/situations/premier-dev-fractionnel", "en")).toBe(
      "/situations/post-funding-first-developer"
    );
    expect(getSituationPathById("premier-dev-fractionnel", "fr")).toBe(
      "/situations/premier-dev-fractionnel"
    );
  });

  it("accepts legacy EN slugs in href and resolves for current locale", () => {
    expect(resolveInternalLinkPath("/en/situations/post-funding-first-developer", "fr")).toBe(
      "/situations/premier-dev-fractionnel"
    );
  });

  it("ignores external, hash, and unknown paths", () => {
    expect(resolveInternalLinkPath("https://example.com", "en")).toBeUndefined();
    expect(resolveInternalLinkPath("#contact", "en")).toBeUndefined();
    expect(resolveInternalLinkPath("/situations/unknown-slug", "en")).toBeUndefined();
  });

  it("maps locale switch paths for situation detail pages", () => {
    expect(resolveLocaleSwitchPath("/situations/premier-dev-fractionnel", "en")).toBe(
      "/situations/post-funding-first-developer"
    );
    expect(resolveLocaleSwitchPath("/en/situations/post-funding-first-developer", "fr")).toBe(
      "/situations/premier-dev-fractionnel"
    );
    expect(resolveLocaleSwitchPath("/situations", "en")).toBeUndefined();
  });

  it("builds absolute alternate URLs for static routes and situations", () => {
    expect(getRouteAlternateUrls(base, ROUTES.situationsHub, defaultLocale)).toEqual({
      fr: `${base}/situations`,
      en: `${base}/en/situations`,
      default: `${base}/situations`,
    });

    const situation = SITUATIONS.find((entry) => entry.id === "premier-dev-fractionnel");
    expect(getSituationAlternateUrls(base, situation, defaultLocale)).toEqual({
      fr: `${base}/situations/premier-dev-fractionnel`,
      en: `${base}/en/situations/post-funding-first-developer`,
      default: `${base}/situations/premier-dev-fractionnel`,
    });
  });
});
