/**
 * Internal route helpers for Next.js i18n.
 * Paths are WITHOUT locale prefix; Next.js `Link` adds `/en` when needed.
 *
 * Maillage in locale JSON: use `/situations/{situation.id}` or `/expertise/{page.id}` (canonical id, not localized slug).
 * Resolved at render time via {@link resolveInternalLinkPath}.
 */

import type { LocalizedPageEntry } from "./localizedManifest";
import {
  SITUATIONS,
  getSituationBySlug,
  getSituationHreflangPaths,
  getSituationPath,
} from "./situationsManifest";
import {
  EXPERTISE_PAGES,
  getExpertiseBySlug,
  getExpertiseHreflangPaths,
  getExpertisePath,
} from "./expertiseManifest";
import { localizedAbsoluteUrl } from "./localizedPath";

/** @readonly */
export const ROUTES = Object.freeze({
  home: "/",
  situationsHub: "/situations",
  services: "/services",
  /** Private CV hub (noindex, omitted from the sitemap). */
  cvHub: "/cvs",
  /** Employee vs fractional day-rate comparison (interactive). */
  dayRateComparison: "/cout-reel-jour",
  /** Product Engineer CV variant. */
  cv: "/cvs/cv-engineer",
  cvEngineer: "/cvs/cv-engineer",
  cvPm: "/cvs/cv-pm",
  cvDev: "/cvs/cv-dev",
  cvReact: "/cvs/cv-react",
  cvTechLead: "/cvs/cv-techlead",
  cvFounding: "/cvs/cv-founding",
  expertiseBase: "/expertise",
});

const STATIC_APP_PATHS = new Set<string>([
  ROUTES.home,
  ROUTES.situationsHub,
  ROUTES.services,
  ROUTES.dayRateComparison,
]);

export interface LocaleAlternateUrls {
  fr: string;
  en: string;
  default: string;
}

export function isExternalHref(href: string): boolean {
  return (
    typeof href === "string" &&
    (/^https?:\/\//i.test(href) || href.startsWith("mailto:") || href.startsWith("tel:"))
  );
}

/** Strip optional `/en` locale prefix from an internal path. */
export function stripLocalePrefixFromPath(path: string): string {
  if (path === "/en") {
    return ROUTES.home;
  }
  if (path.startsWith("/en/")) {
    return path.slice(3);
  }
  return path;
}

/** Normalize a href or asPath to a pathname without locale prefix, query, or hash. */
export function normalizeAppPathname(href: string): string {
  const withoutHash = href.split("#")[0];
  const withoutQuery = withoutHash.split("?")[0];
  return stripLocalePrefixFromPath(withoutQuery);
}

export function getSituationById(id: string): LocalizedPageEntry | undefined {
  return SITUATIONS.find((situation) => situation.id === id);
}

export function getSituationPathById(id: string, locale: string): string | undefined {
  const situation = getSituationById(id);
  return situation ? getSituationPath(situation, locale) : undefined;
}

export function getExpertiseById(id: string): LocalizedPageEntry | undefined {
  return EXPERTISE_PAGES.find((page) => page.id === id);
}

export function getExpertisePathById(id: string, locale: string): string | undefined {
  const page = getExpertiseById(id);
  return page ? getExpertisePath(page, locale) : undefined;
}

/** Resolve an internal href to a locale-aware pathname for Next.js `Link`. */
export function resolveInternalLinkPath(href: string, locale: string): string | undefined {
  if (
    typeof href !== "string" ||
    isExternalHref(href) ||
    href.startsWith("#") ||
    !href.startsWith("/")
  ) {
    return undefined;
  }

  const pathOnly = normalizeAppPathname(href);

  if (STATIC_APP_PATHS.has(pathOnly)) {
    return pathOnly;
  }

  const situationMatch = pathOnly.match(/^\/situations\/([^/]+)\/?$/);
  if (situationMatch) {
    const situation = getSituationById(situationMatch[1]) ?? getSituationBySlug(situationMatch[1]);
    if (!situation) {
      return undefined;
    }
    return getSituationPath(situation, locale);
  }

  const expertiseMatch = pathOnly.match(/^\/expertise\/([^/]+)\/?$/);
  if (expertiseMatch) {
    const page = getExpertiseById(expertiseMatch[1]) ?? getExpertiseBySlug(expertiseMatch[1]);
    if (!page) {
      return undefined;
    }
    return getExpertisePath(page, locale);
  }

  return undefined;
}

/** Path for locale switch on situation detail pages (slug differs by locale). */
export function resolveLocaleSwitchPath(asPath: string, targetLocale: string): string | undefined {
  const pathOnly = normalizeAppPathname(asPath);
  const situationMatch = pathOnly.match(/^\/situations\/([^/]+)\/?$/);

  if (situationMatch) {
    const situation = getSituationById(situationMatch[1]) ?? getSituationBySlug(situationMatch[1]);
    if (!situation) {
      return undefined;
    }
    return getSituationPath(situation, targetLocale);
  }

  const expertiseMatch = pathOnly.match(/^\/expertise\/([^/]+)\/?$/);
  if (expertiseMatch) {
    const page = getExpertiseById(expertiseMatch[1]) ?? getExpertiseBySlug(expertiseMatch[1]);
    if (!page) {
      return undefined;
    }
    return getExpertisePath(page, targetLocale);
  }

  return undefined;
}

/** Absolute FR/EN/default URLs for a static route (sitemap hreflang). */
export function getRouteAlternateUrls(
  base: string,
  pathname: string,
  defaultLocale = "fr"
): LocaleAlternateUrls {
  return {
    fr: localizedAbsoluteUrl(base, "fr", defaultLocale, pathname),
    en: localizedAbsoluteUrl(base, "en", defaultLocale, pathname),
    default: localizedAbsoluteUrl(base, defaultLocale, defaultLocale, pathname),
  };
}

/** Absolute FR/EN/default URLs for a situation page (sitemap hreflang, audits). */
export function getSituationAlternateUrls(
  base: string,
  situation: LocalizedPageEntry,
  defaultLocale = "fr"
): LocaleAlternateUrls {
  const paths = getSituationHreflangPaths(situation, defaultLocale);
  return {
    fr: localizedAbsoluteUrl(base, "fr", defaultLocale, paths.fr),
    en: localizedAbsoluteUrl(base, "en", defaultLocale, paths.en),
    default: localizedAbsoluteUrl(base, defaultLocale, defaultLocale, paths.default),
  };
}

/** Absolute FR/EN/default URLs for an expertise page (sitemap hreflang). */
export function getExpertiseAlternateUrls(
  base: string,
  page: LocalizedPageEntry,
  defaultLocale = "fr"
): LocaleAlternateUrls {
  const paths = getExpertiseHreflangPaths(page, defaultLocale);
  return {
    fr: localizedAbsoluteUrl(base, "fr", defaultLocale, paths.fr),
    en: localizedAbsoluteUrl(base, "en", defaultLocale, paths.en),
    default: localizedAbsoluteUrl(base, defaultLocale, defaultLocale, paths.default),
  };
}

/** Absolute URL for a static app route in a given locale. */
export function getLocalizedRouteUrl(
  base: string,
  pathname: string,
  locale: string,
  defaultLocale = "fr"
): string {
  return localizedAbsoluteUrl(base, locale, defaultLocale, pathname);
}
