/**
 * SEO expertise pages (indexed, not listed in situations hub or quiz).
 * Locale-specific URL slugs (FR + EN).
 *
 * Internal links in locale JSON: `/expertise/{id}` (see commons/siteRoutes.ts).
 */

import { createLocalizedManifest, type LocalizedPageEntry } from "./localizedManifest";

const EXPERTISE_PAGES_DATA: LocalizedPageEntry[] = [
  {
    id: "wordpress-produit-editorial",
    slugFr: "wordpress-produit-editorial",
    slugEn: "wordpress-editorial-product",
    namespace: "expertise-wordpress-produit-editorial",
    publishedAt: "2026-05-26",
  },
];

const manifest = createLocalizedManifest("/expertise", EXPERTISE_PAGES_DATA);

export const EXPERTISE_PAGES = manifest.entries;
export const getExpertiseSlug = manifest.getSlug;
export const getExpertisePath = manifest.getPath;
export const getExpertiseBySlug = manifest.getBySlug;
export const getAllExpertiseSlugs = manifest.getAllSlugs;
export const getExpertiseHreflangPaths = manifest.getHreflangPaths;
