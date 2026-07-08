/**
 * Published audience situations. Locale-specific URL slugs (FR + EN).
 * CommonJS so next.config.mjs can load it without ESM package warnings.
 *
 * Internal links in locale JSON: `/situations/{id}` (see commons/siteRoutes.js).
 * @typedef {{ id: string; slugFr: string; slugEn: string; namespace: string; publishedAt: string }} SituationEntry
 */

/** @type {SituationEntry[]} */
const SITUATIONS = [
  {
    id: "premier-dev-fractionnel",
    slugFr: "premier-dev-fractionnel",
    slugEn: "post-funding-first-developer",
    namespace: "situation-premier-dev-fractionnel",
    publishedAt: "2026-05-19",
  },
  {
    id: "dev-unique-backup",
    slugFr: "dev-unique-backup",
    slugEn: "solo-developer-backup",
    namespace: "situation-dev-unique-backup",
    publishedAt: "2026-05-20",
  },
  {
    id: "product-manager-fractionnel",
    slugFr: "product-manager-fractionnel",
    slugEn: "fractional-product-manager",
    namespace: "situation-product-manager-fractionnel",
    publishedAt: "2026-05-20",
  },
  {
    id: "refonte-produit-par-phases",
    slugFr: "refonte-produit-par-phases",
    slugEn: "phased-wordpress-rebuild",
    namespace: "situation-refonte-produit-par-phases",
    publishedAt: "2026-05-20",
  },
  {
    id: "plateforme-editoriale-produit",
    slugFr: "plateforme-editoriale-produit",
    slugEn: "editorial-product-platform",
    namespace: "situation-plateforme-editoriale-produit",
    publishedAt: "2026-05-20",
  },
  {
    id: "mvp-saas-faisabilite",
    slugFr: "mvp-saas-faisabilite",
    slugEn: "saas-mvp-launch",
    namespace: "situation-mvp-saas-faisabilite",
    publishedAt: "2026-05-20",
  },
  {
    id: "ia-produit-garde-fous",
    slugFr: "ia-produit-garde-fous",
    slugEn: "product-ai-guardrails",
    namespace: "situation-ia-produit-garde-fous",
    publishedAt: "2026-05-20",
  },
];

/**
 * @param {SituationEntry} situation
 * @param {string} locale
 * @returns {string}
 */
function getSituationSlug(situation, locale) {
  return locale === "en" ? situation.slugEn : situation.slugFr;
}

/**
 * @param {SituationEntry} situation
 * @param {string} locale
 * @returns {string}
 */
function getSituationPath(situation, locale) {
  return `/situations/${getSituationSlug(situation, locale)}`;
}

/**
 * @param {string} slug
 * @param {string} [locale] When set, only match that locale's slug.
 * @returns {SituationEntry | undefined}
 */
function getSituationBySlug(slug, locale) {
  if (locale) {
    return SITUATIONS.find((situation) => getSituationSlug(situation, locale) === slug);
  }
  return SITUATIONS.find(
    (situation) => situation.slugFr === slug || situation.slugEn === slug || situation.id === slug
  );
}

/**
 * @param {string} [locale] When set, return slugs for that locale only.
 * @returns {string[]}
 */
function getAllSituationSlugs(locale) {
  if (locale) {
    return SITUATIONS.map((situation) => getSituationSlug(situation, locale));
  }
  return SITUATIONS.map((situation) => situation.id);
}

/**
 * @param {SituationEntry} situation
 * @param {string} defaultLocale
 * @returns {{ fr: string; en: string; default: string }}
 */
function getSituationHreflangPaths(situation, defaultLocale = "fr") {
  const frPath = getSituationPath(situation, "fr");
  const enPath = getSituationPath(situation, "en");
  return {
    fr: frPath,
    en: enPath,
    default: defaultLocale === "en" ? enPath : frPath,
  };
}

module.exports = {
  SITUATIONS,
  getSituationSlug,
  getSituationPath,
  getSituationBySlug,
  getAllSituationSlugs,
  getSituationHreflangPaths,
};
