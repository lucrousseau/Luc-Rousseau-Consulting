/**
 * Factory for locale-aware slug manifests (situations, expertise, future hubs).
 */

export interface LocalizedPageEntry {
  id: string;
  slugFr: string;
  slugEn: string;
  namespace: string;
  publishedAt: string;
}

export function createLocalizedManifest(basePath: string, entries: LocalizedPageEntry[]) {
  function getSlug(entry: LocalizedPageEntry, locale: string) {
    return locale === "en" ? entry.slugEn : entry.slugFr;
  }

  function getPath(entry: LocalizedPageEntry, locale: string) {
    return `${basePath}/${getSlug(entry, locale)}`;
  }

  function getBySlug(slug: string, locale?: string): LocalizedPageEntry | undefined {
    if (locale) {
      return entries.find((entry) => getSlug(entry, locale) === slug);
    }
    return entries.find(
      (entry) => entry.slugFr === slug || entry.slugEn === slug || entry.id === slug
    );
  }

  function getAllSlugs(locale?: string): string[] {
    if (locale) {
      return entries.map((entry) => getSlug(entry, locale));
    }
    return entries.map((entry) => entry.id);
  }

  function getHreflangPaths(entry: LocalizedPageEntry, defaultLocale = "fr") {
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
