/**
 * Shared section prop types (JSDoc only, no runtime exports).
 *
 * @typedef {object} SectionCtaOverride
 * @property {string} [link] - Calendly URL; defaults to `common:schedule-me` via getScheduleCta
 * @property {string} [label] - CTA button label
 *
 * @typedef {object} SectionWithCtaProps
 * @property {SectionCtaOverride} [cta] - Optional schedule CTA override
 * @property {boolean} [showCta=true] - Render schedule CTA block when false, omit button
 * @property {object} [introRowStyle] - Row style override for SectionIntro (reserved)
 * @property {object} [ctaRowStyle] - Row style override for SectionCta (reserved)
 * @property {string} [className] - Extra class on section Container (reserved)
 *
 * @typedef {SectionWithCtaProps & object} SectionWithBackgroundProps
 * @property {string} [backgroundColor] - Container background color
 */

export {};
