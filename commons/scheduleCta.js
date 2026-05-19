/**
 * Default Calendly CTA from `common` locale namespace.
 *
 * @param {import("i18next").TFunction} t - next-i18next `t` (include `common` keys)
 * @param {{ link?: string; label?: string }} [overrides]
 * @returns {{ link: string; label: string }}
 */
export function getScheduleCta(t, overrides = {}) {
  return {
    link: overrides.link ?? t("common:schedule-me"),
    label: overrides.label ?? t("common:schedule-me-label"),
  };
}
