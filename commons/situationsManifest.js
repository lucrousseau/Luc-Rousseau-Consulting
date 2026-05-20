/**
 * Published audience situations. Single canonical slug per page (FR + EN).
 * @typedef {{ slug: string; namespace: string; publishedAt: string }} SituationEntry
 */

/** @type {SituationEntry[]} */
export const SITUATIONS = [
  {
    slug: "premier-dev-fractionnel",
    namespace: "situation-premier-dev-fractionnel",
    publishedAt: "2026-05-19",
  },
  {
    slug: "dev-unique-backup",
    namespace: "situation-dev-unique-backup",
    publishedAt: "2026-05-19",
  },
  {
    slug: "product-manager-fractionnel",
    namespace: "situation-product-manager-fractionnel",
    publishedAt: "2026-05-20",
  },
  {
    slug: "refonte-produit-par-phases",
    namespace: "situation-refonte-produit-par-phases",
    publishedAt: "2026-05-20",
  },
  {
    slug: "plateforme-editoriale-produit",
    namespace: "situation-plateforme-editoriale-produit",
    publishedAt: "2026-05-20",
  },
  {
    slug: "mvp-saas-faisabilite",
    namespace: "situation-mvp-saas-faisabilite",
    publishedAt: "2026-05-20",
  },
  {
    slug: "ia-produit-garde-fous",
    namespace: "situation-ia-produit-garde-fous",
    publishedAt: "2026-05-20",
  },
];

/**
 * @param {string} slug
 * @returns {SituationEntry | undefined}
 */
export function getSituationBySlug(slug) {
  return SITUATIONS.find((situation) => situation.slug === slug);
}

/**
 * @returns {string[]}
 */
export function getAllSituationSlugs() {
  return SITUATIONS.map((situation) => situation.slug);
}
