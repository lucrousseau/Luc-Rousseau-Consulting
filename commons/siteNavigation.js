/**
 * Primary site navigation items (locale-aware paths via Next.js i18n routing).
 * @param {(key: string) => string} t - i18n `t` with `common` loaded
 * @param {{ includeHome?: boolean }} [options]
 * @returns {{ label: string; href: string }[]}
 */
export function getSiteNavigationItems(t, { includeHome = true } = {}) {
  const items = [];

  if (includeHome) {
    items.push({ label: t("common:home-link-label"), href: "/" });
  }

  items.push({ label: t("common:situations-link-label"), href: "/situations" });
  items.push({ label: t("common:contact-link-label"), href: "#contact" });

  return items;
}
