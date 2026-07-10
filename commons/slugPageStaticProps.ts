import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";

import type { LocalizedPageEntry } from "./localizedManifest";

export interface SlugPageManifestApi {
  getAllSlugs: (locale?: string) => string[];
  getBySlug: (slug: string, locale: string) => LocalizedPageEntry | undefined;
  getPath: (entry: LocalizedPageEntry, locale: string) => string;
  getHreflangPaths: (
    entry: LocalizedPageEntry,
    defaultLocale?: string
  ) => { fr: string; en: string; default: string };
}

export function createSlugPageStaticPaths(getAllSlugs: SlugPageManifestApi["getAllSlugs"]) {
  return {
    paths: ["fr", "en"].flatMap((locale) =>
      getAllSlugs(locale).map((slug) => ({ params: { slug }, locale }))
    ),
    fallback: false,
  };
}

interface SlugPageContext {
  params: { slug: string };
  locale: string;
}

export async function createSlugPageStaticProps(
  { params, locale }: SlugPageContext,
  manifest: SlugPageManifestApi
) {
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
