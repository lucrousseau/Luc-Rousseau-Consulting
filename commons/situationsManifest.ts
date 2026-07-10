/**
 * Published audience situations. Locale-specific URL slugs (FR + EN).
 *
 * Internal links in locale JSON: `/situations/{id}` (see commons/siteRoutes.ts).
 */

import { createLocalizedManifest, type LocalizedPageEntry } from "./localizedManifest";

const SITUATIONS_DATA: LocalizedPageEntry[] = [
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

const manifest = createLocalizedManifest("/situations", SITUATIONS_DATA);

export const SITUATIONS = manifest.entries;
export const getSituationSlug = manifest.getSlug;
export const getSituationPath = manifest.getPath;
export const getSituationBySlug = manifest.getBySlug;
export const getAllSituationSlugs = manifest.getAllSlugs;
export const getSituationHreflangPaths = manifest.getHreflangPaths;
