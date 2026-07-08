/**
 * Internal route helpers for Next.js i18n.
 * Paths are WITHOUT locale prefix; Next.js `Link` adds `/en` when needed.
 *
 * Maillage in locale JSON: use `/situations/{situation.id}` or `/expertise/{page.id}` (canonical id, not localized slug).
 * Resolved at render time via {@link resolveInternalLinkPath}.
 */

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

/** @type {ReadonlySet<string>} */
const STATIC_APP_PATHS = new Set([ROUTES.home, ROUTES.situationsHub, ROUTES.services]);

/**
 * @param {string} href
 * @returns {boolean}
 */
export function isExternalHref(href) {
  return (
    typeof href === "string" &&
    (/^https?:\/\//i.test(href) || href.startsWith("mailto:") || href.startsWith("tel:"))
  );
}

/**
 * Strip optional `/en` locale prefix from an internal path.
 * @param {string} path
 * @returns {string}
 */
export function stripLocalePrefixFromPath(path) {
  if (path === "/en") {
    return ROUTES.home;
  }
  if (path.startsWith("/en/")) {
    return path.slice(3);
  }
  return path;
}

/**
 * Normalize a href or asPath to a pathname without locale prefix, query, or hash.
 * @param {string} href
 * @returns {string}
 */
export function normalizeAppPathname(href) {
  const withoutHash = href.split("#")[0];
  const withoutQuery = withoutHash.split("?")[0];
  return stripLocalePrefixFromPath(withoutQuery);
}

/**
 * @param {string} id
 * @returns {import("./situationsManifest").SituationEntry | undefined}
 */
export function getSituationById(id) {
  return SITUATIONS.find((situation) => situation.id === id);
}

/**
 * @param {string} id
 * @param {string} locale
 * @returns {string | undefined}
 */
export function getSituationPathById(id, locale) {
  const situation = getSituationById(id);
  return situation ? getSituationPath(situation, locale) : undefined;
}

/**
 * @param {string} id
 * @returns {import("./expertiseManifest").ExpertiseEntry | undefined}
 */
export function getExpertiseById(id) {
  return EXPERTISE_PAGES.find((page) => page.id === id);
}

/**
 * @param {string} id
 * @param {string} locale
 * @returns {string | undefined}
 */
export function getExpertisePathById(id, locale) {
  const page = getExpertiseById(id);
  return page ? getExpertisePath(page, locale) : undefined;
}

/**
 * Resolve an internal href to a locale-aware pathname for Next.js `Link`.
 * @param {string} href
 * @param {string} locale
 * @returns {string | undefined}
 */
export function resolveInternalLinkPath(href, locale) {
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

/**
 * Path for locale switch on situation detail pages (slug differs by locale).
 * @param {string} asPath
 * @param {string} targetLocale
 * @returns {string | undefined}
 */
export function resolveLocaleSwitchPath(asPath, targetLocale) {
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

/**
 * Absolute FR/EN/default URLs for a static route (sitemap hreflang).
 * @param {string} base
 * @param {string} pathname
 * @param {string} [defaultLocale]
 * @returns {{ fr: string; en: string; default: string }}
 */
export function getRouteAlternateUrls(base, pathname, defaultLocale = "fr") {
  return {
    fr: localizedAbsoluteUrl(base, "fr", defaultLocale, pathname),
    en: localizedAbsoluteUrl(base, "en", defaultLocale, pathname),
    default: localizedAbsoluteUrl(base, defaultLocale, defaultLocale, pathname),
  };
}

/**
 * Absolute FR/EN/default URLs for a situation page (sitemap hreflang, audits).
 * @param {string} base
 * @param {import("./situationsManifest").SituationEntry} situation
 * @param {string} [defaultLocale]
 * @returns {{ fr: string; en: string; default: string }}
 */
export function getSituationAlternateUrls(base, situation, defaultLocale = "fr") {
  const paths = getSituationHreflangPaths(situation, defaultLocale);
  return {
    fr: localizedAbsoluteUrl(base, "fr", defaultLocale, paths.fr),
    en: localizedAbsoluteUrl(base, "en", defaultLocale, paths.en),
    default: localizedAbsoluteUrl(base, defaultLocale, defaultLocale, paths.default),
  };
}

/**
 * Absolute FR/EN/default URLs for an expertise page (sitemap hreflang).
 * @param {string} base
 * @param {import("./expertiseManifest").ExpertiseEntry} page
 * @param {string} [defaultLocale]
 * @returns {{ fr: string; en: string; default: string }}
 */
export function getExpertiseAlternateUrls(base, page, defaultLocale = "fr") {
  const paths = getExpertiseHreflangPaths(page, defaultLocale);
  return {
    fr: localizedAbsoluteUrl(base, "fr", defaultLocale, paths.fr),
    en: localizedAbsoluteUrl(base, "en", defaultLocale, paths.en),
    default: localizedAbsoluteUrl(base, defaultLocale, defaultLocale, paths.default),
  };
}

/**
 * Absolute URL for a static app route in a given locale.
 * @param {string} base
 * @param {string} pathname
 * @param {string} locale
 * @param {string} [defaultLocale]
 * @returns {string}
 */
export function getLocalizedRouteUrl(base, pathname, locale, defaultLocale = "fr") {
  return localizedAbsoluteUrl(base, locale, defaultLocale, pathname);
}
