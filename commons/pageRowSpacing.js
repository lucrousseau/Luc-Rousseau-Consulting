/**
 * Row padding tokens for page sections; must match `--page-home-row-*` on
 * `.page-home` (`pages/home.scss`). Keeps vertical rhythm consistent between sections.
 */
export const rowPad = "var(--page-home-row-pad, 2rem)";
export const rowPadSm = "var(--page-home-row-pad-sm, 1.5rem)";
export const rowPadInner = "var(--page-home-row-pad-inner, 1.5rem)";

/** After badge / title / intro lede */
export const homeIntroRowStyle = {
  "--padding-bottom": rowPad,
  "--sm-padding-bottom": rowPadSm,
};

/** CTA block: Calendly + ContactAlternates */
export const homeCtaRowStyle = {
  "--padding-top": rowPad,
  "--sm-padding-top": rowPadSm,
  "--padding-bottom": rowPad,
  "--sm-padding-bottom": rowPadSm,
};

/** Situation page CTA (follows a block that already ends with row pad) */
export const homeSituationCtaRowStyle = {
  "--padding-top": "0",
  "--sm-padding-top": "0",
  "--padding-bottom": rowPad,
  "--sm-padding-bottom": rowPadSm,
};

/** Dense stack (e.g. engagement terms) */
export const homeBlockRowStyle = {
  "--padding-top": rowPad,
  "--sm-padding-top": rowPadSm,
  "--padding-bottom": rowPadInner,
};

/** Text + CTA teaser before primary button (engagement) */
export const homePreCtaContentRowStyle = {
  "--padding-top": rowPadInner,
  "--sm-padding-top": rowPadSm,
  "--padding-bottom": rowPad,
  "--sm-padding-bottom": rowPadSm,
};

/** Continuation row (e.g. closing line before CTA) */
export const homeStackContinueStyle = {
  "--padding-top": rowPad,
  "--sm-padding-top": rowPadSm,
};

/** Sub-block under intro (product-engineer table lede) */
export const homeIntroSubRowStyle = {
  "--padding-bottom": rowPad,
  "--sm-padding-bottom": rowPadSm,
};

/** Main body row after SectionIntro (intro already adds bottom padding) */
export const homeBodyRowStyle = {
  "--padding-top": "0",
  "--sm-padding-top": "0",
  "--padding-bottom": "0",
  "--sm-padding-bottom": "0",
};

/** Table or dense content directly under SectionIntro (no extra top gap) */
export const homeTableRowStyle = {
  "--padding-top": "0",
  "--sm-padding-top": "0",
  "--padding-bottom": rowPad,
  "--sm-padding-bottom": rowPadSm,
};
