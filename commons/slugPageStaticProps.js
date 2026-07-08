import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";

/**
 * @typedef {import("./localizedManifest").LocalizedPageEntry} LocalizedPageEntry
 */

/**
 * @typedef {object} SlugPageManifestApi
 * @property {(locale?: string) => string[]} getAllSlugs
 * @property {(slug: string, locale: string) => LocalizedPageEntry | undefined} getBySlug
 * @property {(entry: LocalizedPageEntry, locale: string) => string} getPath
 * @property {(entry: LocalizedPageEntry, defaultLocale?: string) => { fr: string; en: string; default: string }} getHreflangPaths
 */

/**
 * @param {SlugPageManifestApi["getAllSlugs"]} getAllSlugs
 */
export function createSlugPageStaticPaths(getAllSlugs) {
  return {
    paths: ["fr", "en"].flatMap((locale) =>
      getAllSlugs(locale).map((slug) => ({ params: { slug }, locale }))
    ),
    fallback: false,
  };
}

/**
 * @param {{ params: { slug: string }; locale: string }} context
 * @param {SlugPageManifestApi} manifest
 */
export async function createSlugPageStaticProps({ params, locale }, manifest) {
  const entry = manifest.getBySlug(params.slug, locale);

  if (!entry) {
    return { notFound: true };
  }

  return {
    props: {
      namespace: entry.namespace,
      pagePath: manifest.getPath(entry, locale),
      hreflangPaths: manifest.getHreflangPaths(entry),
      publishedAt: entry.publishedAt,
      ...(await serverSideTranslations(locale, [entry.namespace, "contact", "common"])),
    },
    revalidate: 86400,
  };
}
