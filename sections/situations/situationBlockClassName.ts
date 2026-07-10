import type { SituationBlock } from "./situationTypes";

/** BEM classes for a situation page block container. */
export function situationBlockClassName(
  block: Pick<SituationBlock, "type" | "sectionKey">
): string {
  const parts = ["section-situation-block", `section-situation-block--${block.type}`];
  if (block.sectionKey) {
    parts.push(`section-situation-block--${block.sectionKey}`);
  }
  return parts.join(" ");
}
