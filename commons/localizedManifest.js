/**
 * Factory for locale-aware slug manifests (situations, expertise, future hubs).
 * CommonJS so next.config.mjs can load manifests without ESM package warnings.
 *
 * @typedef {{ id: string; slugFr: string; slugEn: string; namespace: string; publishedAt: string }} LocalizedPageEntry
 */

/**
 * @param {string} basePath Path prefix without locale (e.g. `/situations`, `/expertise`)
 * @param {LocalizedPageEntry[]} entries
 */
function createLocalizedManifest(basePath, entries) {
  /**
   * @param {LocalizedPageEntry} entry
   * @param {string} locale
   */
  function getSlug(entry, locale) {
    return locale === "en" ? entry.slugEn : entry.slugFr;
  }

  /**
   * @param {LocalizedPageEntry} entry
   * @param {string} locale
   */
  function getPath(entry, locale) {
    return `${basePath}/${getSlug(entry, locale)}`;
  }

  /**
   * @param {string} slug
   * @param {string} [locale]
   * @returns {LocalizedPageEntry | undefined}
   */
  function getBySlug(slug, locale) {
    if (locale) {
      return entries.find((entry) => getSlug(entry, locale) === slug);
    }
    return entries.find(
      (entry) => entry.slugFr === slug || entry.slugEn === slug || entry.id === slug
    );
  }

  /**
   * @param {string} [locale]
   * @returns {string[]}
   */
  function getAllSlugs(locale) {
    if (locale) {
      return entries.map((entry) => getSlug(entry, locale));
    }
    return entries.map((entry) => entry.id);
  }

  /**
   * @param {LocalizedPageEntry} entry
   * @param {string} [defaultLocale]
   */
  function getHreflangPaths(entry, defaultLocale = "fr") {
    const frPath = getPath(entry, "fr");
    const enPath = getPath(entry, "en");
    return {
      fr: frPath,
      en: enPath,
      default: defaultLocale === "en" ? enPath : frPath,
    };
  }

  return {
    entries,
    getSlug,
    getPath,
    getBySlug,
    getAllSlugs,
    getHreflangPaths,
  };
}

module.exports = { createLocalizedManifest };
