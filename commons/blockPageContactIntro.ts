interface BlockPageBlock {
  type?: string;
  teaser?: string;
}

/** Footer intro for the global Contact block on block-driven detail pages. Reads the last `cta` block teaser from i18n `blocks[]` (not rendered inline). */
export function getBlockPageContactIntro(blocks: unknown): string | null {
  if (!Array.isArray(blocks)) {
    return null;
  }

  const ctaBlock = (blocks as BlockPageBlock[]).findLast(
    (block) => block?.type === "cta" && typeof block.teaser === "string" && block.teaser.trim()
  );

  return ctaBlock?.teaser ?? null;
}
