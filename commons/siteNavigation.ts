import type { TFunction } from "i18next";

import { ROUTES } from "./siteRoutes";

/** Primary site navigation items (locale-aware paths via Next.js i18n routing). */
interface SiteNavigationOptions {
  includeHome?: boolean;
}

export function getSiteNavigationItems(
  t: TFunction,
  { includeHome = true }: SiteNavigationOptions = {}
): { label: string; href: string }[] {
  const items: { label: string; href: string }[] = [];

  if (includeHome) {
    items.push({ label: t("common:home-link-label"), href: ROUTES.home });
  }

  items.push({ label: t("common:situations-link-label"), href: ROUTES.situationsHub });
  items.push({ label: t("common:contact-link-label"), href: "#contact" });

  return items;
}
