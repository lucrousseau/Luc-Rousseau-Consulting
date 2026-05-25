/**
 * Edge-safe slug pairs for locale redirect middleware.
 * Keep in sync with commons/situationsManifest.js (see situationSlugRoutes.test.js).
 * @type {{ slugFr: string; slugEn: string }[]}
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
 * @returns {{ slugFr: string; slugEn: string } | undefined}
 */
export function findSituationSlugPair(slug) {
  return SITUATION_SLUG_PAIRS.find((pair) => pair.slugFr === slug || pair.slugEn === slug);
}
