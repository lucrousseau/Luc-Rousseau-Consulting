/**
 * Published audience guides. Single canonical slug per guide (FR + EN).
 * @typedef {{ slug: string; namespace: string; publishedAt: string }} GuideEntry
 */

/** @type {GuideEntry[]} */
export const GUIDES = [
  {
    slug: "premier-dev-fractionnel",
    namespace: "guide-premier-dev-fractionnel",
    publishedAt: "2026-05-19",
  },
  {
    slug: "dev-unique-backup",
    namespace: "guide-dev-unique-backup",
    publishedAt: "2026-05-19",
  },
  {
    slug: "product-manager-fractionnel",
    namespace: "guide-product-manager-fractionnel",
    publishedAt: "2026-05-20",
  },
  {
    slug: "refonte-produit-par-phases",
    namespace: "guide-refonte-produit-par-phases",
    publishedAt: "2026-05-20",
  },
  {
    slug: "plateforme-editoriale-produit",
    namespace: "guide-plateforme-editoriale-produit",
    publishedAt: "2026-05-20",
  },
  {
    slug: "mvp-saas-faisabilite",
    namespace: "guide-mvp-saas-faisabilite",
    publishedAt: "2026-05-20",
  },
  {
    slug: "ia-produit-garde-fous",
    namespace: "guide-ia-produit-garde-fous",
    publishedAt: "2026-05-20",
  },
];

/**
 * @param {string} slug
 * @returns {GuideEntry | undefined}
 */
export function getGuideBySlug(slug) {
  return GUIDES.find((guide) => guide.slug === slug);
}

/**
 * @returns {string[]}
 */
export function getAllGuideSlugs() {
  return GUIDES.map((guide) => guide.slug);
}
