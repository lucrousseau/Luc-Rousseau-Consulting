/** @jest-environment node */

import {
  buildNotFoundMarkdown,
  buildPageMarkdown,
  isKnownSitePath,
  isPublicHtmlPath,
  normalizeRequestPathname,
} from "./pageMarkdown";
import { ROUTES } from "./siteRoutes";

const base = "https://lucrousseau.com";

describe("pageMarkdown", () => {
  it("normalizes locale prefixes", () => {
    expect(normalizeRequestPathname("/en/developers")).toEqual({
      locale: "en",
      path: ROUTES.developers,
    });
    expect(normalizeRequestPathname("/situations")).toEqual({
      locale: "fr",
      path: ROUTES.situationsHub,
    });
  });

  it("builds home markdown from llms.txt content", () => {
    const body = buildPageMarkdown(base, ROUTES.home, "fr");
    expect(body).toContain("# Luc Rousseau");
    expect(body).toContain(`${base}/openapi.json`);
    expect(body).toContain(`${base}/developers`);
  });

  it("builds developers markdown with Luc Rousseau naming", () => {
    const body = buildPageMarkdown(base, ROUTES.developers, "en");
    expect(body).toContain("Luc Rousseau developer resources");
    expect(body).toContain(`${base}/openapi.json`);
    expect(body).toContain("Accept: text/markdown");
  });

  it("builds a recovery markdown 404 body", () => {
    const body = buildNotFoundMarkdown(base);
    expect(body).toContain("# Not found");
    expect(body).toContain(`${base}/llms.txt`);
    expect(body).toContain(`${base}/openapi.json`);
    expect(body).toContain(`${base}/developers`);
    expect(body).toContain(`${base}/sitemap.xml`);
  });

  it("recognizes public and private known paths", () => {
    expect(isPublicHtmlPath(ROUTES.developers)).toBe(true);
    expect(isKnownSitePath(ROUTES.cvHub)).toBe(true);
    expect(isPublicHtmlPath("/this-does-not-exist")).toBe(false);
    expect(isKnownSitePath("/this-does-not-exist")).toBe(false);
  });
});
