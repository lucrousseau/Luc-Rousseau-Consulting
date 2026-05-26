/**
 * SEO expertise pages (indexed, not listed in situations hub or quiz).
 * Locale-specific URL slugs (FR + EN).
 * CommonJS so next.config.mjs can load it without ESM package warnings.
 *
 * Internal links in locale JSON: `/expertise/{id}` (see commons/siteRoutes.js).
 * @typedef {{ id: string; slugFr: string; slugEn: string; namespace: string; publishedAt: string }} ExpertiseEntry
 */

/** @type {ExpertiseEntry[]} */
const EXPERTISE_PAGES = [
  {
    id: "wordpress-produit-editorial",
    slugFr: "wordpress-produit-editorial",
    slugEn: "wordpress-editorial-product",
    namespace: "expertise-wordpress-produit-editorial",
    publishedAt: "2026-05-26",
  },
];

/**
 * @param {string} locale
 * @returns {"slugFr" | "slugEn"}
 */
function slugKeyForLocale(locale) {
  return locale === "en" ? "slugEn" : "slugFr";
}

/**
 * @param {ExpertiseEntry} page
 * @param {string} locale
 * @returns {string}
 */
function getExpertiseSlug(page, locale) {
  return page[slugKeyForLocale(locale)];
}

/**
 * @param {ExpertiseEntry} page
 * @param {string} locale
 * @returns {string}
 */
function getExpertisePath(page, locale) {
  return `/expertise/${getExpertiseSlug(page, locale)}`;
}

/**
 * @param {string} slug
 * @param {string} [locale] When set, only match that locale's slug.
 * @returns {ExpertiseEntry | undefined}
 */
function getExpertiseBySlug(slug, locale) {
  if (locale) {
    const key = slugKeyForLocale(locale);
    return EXPERTISE_PAGES.find((page) => page[key] === slug);
  }
  return EXPERTISE_PAGES.find(
    (page) => page.slugFr === slug || page.slugEn === slug || page.id === slug
  );
}

/**
 * @param {string} [locale] When set, return slugs for that locale only.
 * @returns {string[]}
 */
function getAllExpertiseSlugs(locale) {
  if (locale) {
    const key = slugKeyForLocale(locale);
    return EXPERTISE_PAGES.map((page) => page[key]);
  }
  return EXPERTISE_PAGES.map((page) => page.id);
}

/**
 * @param {ExpertiseEntry} page
 * @param {string} defaultLocale
 * @returns {{ fr: string; en: string; default: string }}
 */
function getExpertiseHreflangPaths(page, defaultLocale = "fr") {
  const frPath = getExpertisePath(page, "fr");
  const enPath = getExpertisePath(page, "en");
  return {
    fr: frPath,
    en: enPath,
    default: defaultLocale === "en" ? enPath : frPath,
  };
}

module.exports = {
  EXPERTISE_PAGES,
  getExpertiseSlug,
  getExpertisePath,
  getExpertiseBySlug,
  getAllExpertiseSlugs,
  getExpertiseHreflangPaths,
};
