interface BlockPageBlock {
  type?: string;
  teaser?: string;
  trackSection?: string;
}

function getLastCtaBlock(blocks: unknown): BlockPageBlock | undefined {
  if (!Array.isArray(blocks)) {
    return undefined;
  }

  return (blocks as BlockPageBlock[]).findLast((block) => block?.type === "cta");
}

/** Footer intro for the global Contact block on block-driven detail pages. Reads the last `cta` block teaser from i18n `blocks[]` (not rendered inline). */
export function getBlockPageContactIntro(blocks: unknown): string | null {
  const ctaBlock = getLastCtaBlock(blocks);
  if (typeof ctaBlock?.teaser !== "string" || !ctaBlock.teaser.trim()) {
    return null;
  }

  return ctaBlock.teaser;
}

/** Analytics `section` from the last `cta` block (`trackSection`), used by situation/expertise heroes. */
export function getBlockPageTrackSection(blocks: unknown, fallback: string): string {
  const ctaBlock = getLastCtaBlock(blocks);
  if (typeof ctaBlock?.trackSection === "string" && ctaBlock.trackSection.trim()) {
    return ctaBlock.trackSection.trim();
  }

  return fallback;
}
