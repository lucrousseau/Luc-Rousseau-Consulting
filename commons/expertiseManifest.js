/**
 * SEO expertise pages (indexed, not listed in situations hub or quiz).
 * Locale-specific URL slugs (FR + EN).
 * CommonJS so next.config.mjs can load it without ESM package warnings.
 *
 * Internal links in locale JSON: `/expertise/{id}` (see commons/siteRoutes.js).
 */

const { createLocalizedManifest } = require("./localizedManifest");

/** @type {import("./localizedManifest").LocalizedPageEntry[]} */
const EXPERTISE_PAGES = [
  {
    id: "wordpress-produit-editorial",
    slugFr: "wordpress-produit-editorial",
    slugEn: "wordpress-editorial-product",
    namespace: "expertise-wordpress-produit-editorial",
    publishedAt: "2026-05-26",
  },
];

const manifest = createLocalizedManifest("/expertise", EXPERTISE_PAGES);

module.exports = {
  EXPERTISE_PAGES: manifest.entries,
  getExpertiseSlug: manifest.getSlug,
  getExpertisePath: manifest.getPath,
  getExpertiseBySlug: manifest.getBySlug,
  getAllExpertiseSlugs: manifest.getAllSlugs,
  getExpertiseHreflangPaths: manifest.getHreflangPaths,
};
