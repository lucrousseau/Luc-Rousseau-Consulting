/**
 * BEM classes for a situation page block container.
 * @param {{ type?: string; sectionKey?: string }} block
 * @returns {string}
 */
export function situationBlockClassName(block) {
  const parts = ["section-situation-block", `section-situation-block--${block.type}`];
  if (block.sectionKey) {
    parts.push(`section-situation-block--${block.sectionKey}`);
  }
  return parts.join(" ");
}
