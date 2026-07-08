/**
 * Footer intro for the global Contact block on situation/expertise pages.
 * Reads the last `cta` block teaser from i18n `blocks[]` (not rendered inline).
 * @param {unknown} blocks
 * @returns {string | null}
 */
export function getSituationContactIntro(blocks) {
  if (!Array.isArray(blocks)) {
    return null;
  }

  const ctaBlock = blocks.findLast(
    (block) => block?.type === "cta" && typeof block.teaser === "string" && block.teaser.trim()
  );

  return ctaBlock?.teaser ?? null;
}
