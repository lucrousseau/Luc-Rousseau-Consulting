/**
 * Markdown representations for public pages (Accept: text/markdown).
 * Keeps agents on the same canonical URLs as HTML browsers.
 */

import { EXPERTISE_PAGES, getExpertiseBySlug, getExpertiseSlug } from "./expertiseManifest";
import {
  buildExpertiseSection,
  buildLlmsTxt,
  buildSituationsSection,
  LLM_CONTACT,
} from "./llmSignal";
import { getExpertiseSeo, getSituationSeo } from "./situationSeoMeta";
import { SITUATIONS, getSituationBySlug, getSituationSlug } from "./situationsManifest";
import {
  getExpertiseAlternateUrls,
  getLocalizedRouteUrl,
  getSituationAlternateUrls,
  ROUTES,
} from "./siteRoutes";

export const DEFAULT_LOCALE = "fr";

export const MACHINE_RESOURCE_PATHS = Object.freeze([
  "/llms.txt",
  "/llms-full.txt",
  "/humans.txt",
  "/sitemap.xml",
  "/robots.txt",
  "/openapi.json",
  "/geo.kml",
]);

function stripTrailingSlash(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname;
}

/** Normalize a request pathname to an app path without locale prefix. */
export function normalizeRequestPathname(pathname: string): {
  locale: "fr" | "en";
  path: string;
} {
  const cleaned = stripTrailingSlash(pathname || "/");
  if (cleaned === "/en") {
    return { locale: "en", path: ROUTES.home };
  }
  if (cleaned.startsWith("/en/")) {
    return { locale: "en", path: stripTrailingSlash(cleaned.slice(3)) || ROUTES.home };
  }
  return { locale: "fr", path: cleaned || ROUTES.home };
}

export function buildNotFoundMarkdown(base: string): string {
  return `# Not found

This path does not exist on Luc Rousseau's site (${base}).

## Where to look next

- [llms.txt](${base}/llms.txt): Luc Rousseau site summary for agents (llmstxt.org)
- [llms-full.txt](${base}/llms-full.txt): Extended identity and engagement model
- [OpenAPI](${base}/openapi.json): Luc Rousseau public machine-readable API surface
- [Developer resources](${base}/developers): Luc Rousseau developer docs (API, OpenAPI, agent files)
- [Sitemap](${base}/sitemap.xml): Full list of indexable pages
- [Home (French)](${base}/) · [Home (English)](${base}/en)

Contact: ${LLM_CONTACT.email}
`;
}

function buildDevelopersMarkdown(base: string): string {
  return `# Luc Rousseau developer resources

Machine-readable and agent-facing resources for lucrousseau.com (Luc Rousseau, Product Builder / external consultant).

## API and specs

- [OpenAPI specification](${base}/openapi.json): Public discovery API (llms.txt, sitemap, robots, humans.txt, markdown negotiation notes)
- [llms.txt](${base}/llms.txt): Site index for LLM systems (llmstxt.org)
- [llms-full.txt](${base}/llms-full.txt): Extended profile
- [humans.txt](${base}/humans.txt): People behind the site
- [sitemap.xml](${base}/sitemap.xml): Indexable pages
- [robots.txt](${base}/robots.txt): Crawler rules

## Content negotiation

Request any public HTML page with \`Accept: text/markdown\` to receive a Markdown representation of that URL. Responses include \`Vary: Accept, Accept-Encoding\`.

Example:

\`\`\`bash
curl -sH "Accept: text/markdown" ${base}/
\`\`\`

## Auth and webhooks

This public site has no authenticated product API, OAuth, or webhooks. Contact for mandates: ${LLM_CONTACT.email} · [Schedule](${LLM_CONTACT.calendly})

## HTML docs

- [Developer resources (French)](${getLocalizedRouteUrl(base, ROUTES.developers, "fr", DEFAULT_LOCALE)})
- [Developer resources (English)](${getLocalizedRouteUrl(base, ROUTES.developers, "en", DEFAULT_LOCALE)})
`;
}

function buildSituationPageMarkdown(
  base: string,
  slug: string,
  locale: "fr" | "en"
): string | null {
  const situation = getSituationBySlug(slug);
  if (!situation) return null;

  const seo = getSituationSeo(locale, situation.namespace);
  const urls = getSituationAlternateUrls(base, situation, DEFAULT_LOCALE);

  return `# ${seo.headline}

${seo.voiceQuote ? `> ${seo.voiceQuote}\n` : ""}
${seo.description}

- French: ${urls.fr}
- English: ${urls.en}
- FR slug: \`${getSituationSlug(situation, "fr")}\`
- EN slug: \`${getSituationSlug(situation, "en")}\`
- Site index: ${base}/llms.txt
- Developer resources: ${base}/developers
- OpenAPI: ${base}/openapi.json
`;
}

function buildExpertisePageMarkdown(
  base: string,
  slug: string,
  locale: "fr" | "en"
): string | null {
  const page = getExpertiseBySlug(slug);
  if (!page) return null;

  const seo = getExpertiseSeo(locale, page.namespace);
  const urls = getExpertiseAlternateUrls(base, page, DEFAULT_LOCALE);

  return `# ${seo.headline}

${seo.voiceQuote ? `> ${seo.voiceQuote}\n` : ""}
${seo.description}

- French: ${urls.fr}
- English: ${urls.en}
- FR slug: \`${getExpertiseSlug(page, "fr")}\`
- EN slug: \`${getExpertiseSlug(page, "en")}\`
- Site index: ${base}/llms.txt
- Developer resources: ${base}/developers
`;
}

function buildSituationsHubMarkdown(base: string, locale: "fr" | "en"): string {
  const hub = getLocalizedRouteUrl(base, ROUTES.situationsHub, locale, DEFAULT_LOCALE);
  return `# Luc Rousseau situations

Audience-specific engagement pages and a two-question routing quiz.

Hub URL: ${hub}

${buildSituationsSection(base)}

## Related

- [llms.txt](${base}/llms.txt)
- [Developer resources](${base}/developers)
- [OpenAPI](${base}/openapi.json)
`;
}

/**
 * Build Markdown for a known public page path (no locale prefix).
 * Returns null when the path is not a public HTML page we negotiate.
 */
export function buildPageMarkdown(
  base: string,
  pathWithoutLocale: string,
  locale: "fr" | "en"
): string | null {
  const path = stripTrailingSlash(pathWithoutLocale || ROUTES.home);

  if (path === ROUTES.home) {
    return buildLlmsTxt(base);
  }

  if (path === ROUTES.situationsHub) {
    return buildSituationsHubMarkdown(base, locale);
  }

  if (path === ROUTES.developers) {
    return buildDevelopersMarkdown(base);
  }

  if (path === ROUTES.services) {
    return `# Luc Rousseau services

See the home page and situations for the public offer.

- [Home](${getLocalizedRouteUrl(base, ROUTES.home, locale, DEFAULT_LOCALE)})
- [Situations](${getLocalizedRouteUrl(base, ROUTES.situationsHub, locale, DEFAULT_LOCALE)})
- [llms.txt](${base}/llms.txt)
- [Developer resources](${base}/developers)
`;
  }

  if (path === ROUTES.about) {
    const title = locale === "en" ? "About Luc Rousseau" : "À propos de Luc Rousseau";
    const intro =
      locale === "en"
        ? "Product Builder and technical consultant based in Quebec, Canada. Creative director turned programmer, now leading product and technical mandates."
        : "Product Builder et consultant technique basé au Québec, Canada. Directeur créatif devenu programmeur, maintenant à la tête de mandats produit et techniques.";
    const aboutUrl = getLocalizedRouteUrl(base, ROUTES.about, locale, DEFAULT_LOCALE);

    return `# ${title}

${intro}

One accountable partner from strategy to delivery. I work across the stack: modern frontends (React, Next.js, Vue), APIs, platform choices, and technical architecture. Not a consultant who leaves a deck, not a dev who only takes tickets—someone who structures, challenges, and ships.

**Background:** Creative director and designer, then programmer, now product and technical leadership. That path gives me a perspective that's rare. I've been on both sides: pixels to systems, UX to APIs, design to roadmap.

**Expertise:** Editorial platforms at scale, complex SaaS, e-commerce, greenfield products. Frontend architecture, API design, database modeling, CI/CD, infrastructure. I understand how product decisions affect engineering constraints, and how engineering choices enable or limit product possibilities.

**Based in Quebec, working across Canada.** Fractional engagement model: senior-level product and technical leadership without full-time executive overhead. Mandates from weeks to ongoing quarterly engagements.

- [Full about page (HTML)](${aboutUrl})
- [Contact](${base}/llms.txt#contact)
- [Developer resources](${base}/developers)
`;
  }

  if (path === ROUTES.privacy) {
    const title = locale === "en" ? "Privacy Policy" : "Politique de confidentialité";
    const intro =
      locale === "en"
        ? "How lucrousseau.com handles your information when you visit or contact for professional services."
        : "Comment lucrousseau.com traite vos informations lorsque vous visitez ou contactez pour des services professionnels.";
    const privacyUrl = getLocalizedRouteUrl(base, ROUTES.privacy, locale, DEFAULT_LOCALE);

    return `# ${title}

${intro}

**Information collected:** Anonymous analytics (page views, region, device, performance via Vercel Analytics). Contact information (name, email) when you reach out. No cookies for tracking or advertising.

**How we use it:** Improve site performance and user experience. Respond to professional inquiries. Maintain communication during active engagements. Legal compliance when required.

**Security:** HTTPS encryption, Content Security Policy headers, secure API authentication, regular security audits.

**Your rights:** Access, correct, or delete your personal information. Opt out of communications. Withdraw consent at any time. Contact hello@lucrousseau.com to exercise these rights.

**Third parties:** Vercel (hosting/analytics), Calendly (scheduling), email providers. Each has its own privacy policy.

Effective: September 1, 2026 · Luc Rousseau operates from Quebec, Canada.

- [Full privacy policy (HTML)](${privacyUrl})
- [Contact](${base}/llms.txt#contact)
`;
  }

  const situationMatch = path.match(/^\/situations\/([^/]+)$/);
  if (situationMatch) {
    return buildSituationPageMarkdown(base, situationMatch[1], locale);
  }

  const expertiseMatch = path.match(/^\/expertise\/([^/]+)$/);
  if (expertiseMatch) {
    return buildExpertisePageMarkdown(base, expertiseMatch[1], locale);
  }

  return null;
}

/** True when this path is a known public HTML page (markdown negotiable). */
export function isPublicHtmlPath(pathWithoutLocale: string): boolean {
  return buildPageMarkdown("https://example.com", pathWithoutLocale, "fr") !== null;
}

/** True when the path maps to a known site page (including private tools). */
export function isKnownSitePath(pathWithoutLocale: string): boolean {
  const path = stripTrailingSlash(pathWithoutLocale || "/");
  if (isPublicHtmlPath(path)) return true;

  const situationMatch = path.match(/^\/situations\/([^/]+)$/);
  if (situationMatch) {
    return Boolean(getSituationBySlug(situationMatch[1]));
  }
  const expertiseMatch = path.match(/^\/expertise\/([^/]+)$/);
  if (expertiseMatch) {
    return Boolean(getExpertiseBySlug(expertiseMatch[1]));
  }

  if (path === ROUTES.cvHub || path.startsWith(`${ROUTES.cvHub}/`)) return true;
  if (path === ROUTES.dayRateComparison || path.startsWith(`${ROUTES.dayRateComparison}/`)) {
    return true;
  }
  return false;
}

export function listPublishedContentPaths(): string[] {
  const paths: string[] = [ROUTES.home, ROUTES.situationsHub, ROUTES.developers, ROUTES.services];
  for (const situation of SITUATIONS) {
    paths.push(`/situations/${situation.slugFr}`);
    paths.push(`/situations/${situation.slugEn}`);
  }
  for (const page of EXPERTISE_PAGES) {
    paths.push(`/expertise/${page.slugFr}`);
    paths.push(`/expertise/${page.slugEn}`);
  }
  return paths;
}

/** Re-export for OpenAPI / developers copy that lists expertise inventory. */
export function buildExpertiseInventoryMarkdown(base: string): string {
  return buildExpertiseSection(base);
}
