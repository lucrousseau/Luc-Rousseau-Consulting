/**
 * Footer intro for the global Contact block on block-driven detail pages.
 * Reads the last `cta` block teaser from i18n `blocks[]` (not rendered inline).
 * @param {unknown} blocks
 * @returns {string | null}
 */
export function getBlockPageContactIntro(blocks) {
  if (!Array.isArray(blocks)) {
    return null;
  }

  const ctaBlock = blocks.findLast(
    (block) => block?.type === "cta" && typeof block.teaser === "string" && block.teaser.trim()
  );

  return ctaBlock?.teaser ?? null;
}
