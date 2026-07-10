import type { TFunction } from "i18next";

/** Default Calendly CTA from `common` locale namespace. */
interface ScheduleCtaOverrides {
  link?: string;
  label?: string;
}

export function getScheduleCta(
  t: TFunction,
  overrides: ScheduleCtaOverrides = {}
): { link: string; label: string } {
  return {
    link: overrides.link ?? t("common:schedule-me"),
    label: overrides.label ?? t("common:schedule-me-label"),
  };
}
