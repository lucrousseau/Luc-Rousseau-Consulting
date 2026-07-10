/**
 * Edge-safe slug pairs for locale redirect middleware and next.config redirects.
 * Keep in sync with commons/situationsManifest.ts (see situationSlugRoutes.test.ts).
 */
export const SITUATION_SLUG_PAIRS = [
  { slugFr: "premier-dev-fractionnel", slugEn: "post-funding-first-developer" },
  { slugFr: "dev-unique-backup", slugEn: "solo-developer-backup" },
  { slugFr: "product-manager-fractionnel", slugEn: "fractional-product-manager" },
  { slugFr: "refonte-produit-par-phases", slugEn: "phased-wordpress-rebuild" },
  { slugFr: "plateforme-editoriale-produit", slugEn: "editorial-product-platform" },
  { slugFr: "mvp-saas-faisabilite", slugEn: "saas-mvp-launch" },
  { slugFr: "ia-produit-garde-fous", slugEn: "product-ai-guardrails" },
];

/**
 * @param {string} slug
 */
export function findSituationSlugPair(slug) {
  return SITUATION_SLUG_PAIRS.find((pair) => pair.slugFr === slug || pair.slugEn === slug);
}
