import { absoluteUrl, localizedPath } from "./localizedPath";

/**
 * @param {object} params
 * @param {string} params.base
 * @param {string} params.locale
 * @param {string} params.defaultLocale
 * @param {{ label: string; path?: string }[]} params.items
 */
export function buildBreadcrumbListJsonLd({ base, locale, defaultLocale, items }) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => {
      const entry = {
        "@type": "ListItem",
        position: index + 1,
        name: item.label,
      };
      if (item.path) {
        entry.item = absoluteUrl(base, localizedPath(locale, defaultLocale, item.path));
      }
      return entry;
    }),
  };
}

/**
 * @param {object} params
 * @param {string} params.base
 * @param {string} params.locale
 * @param {string} params.defaultLocale
 * @param {string} params.pageUrl
 * @param {string} params.pageName
 * @param {string} params.pageDescription
 * @param {string} params.homeLabel
 * @param {string} params.situationsHubLabel
 * @param {{ slug: string; name: string }[]} params.situations
 * @returns {object[]}
 */
export function buildSituationsHubJsonLd({
  base,
  locale,
  defaultLocale,
  pageUrl,
  pageName,
  pageDescription,
  homeLabel,
  situationsHubLabel,
  situations,
}) {
  const inLanguage = locale === "fr" ? "fr-CA" : "en-CA";

  return [
    buildBreadcrumbListJsonLd({
      base,
      locale,
      defaultLocale,
      items: [{ label: homeLabel, path: "/" }, { label: situationsHubLabel }],
    }),
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: pageName,
      description: pageDescription,
      url: pageUrl,
      inLanguage,
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: situations.length,
        itemListElement: situations.map((situation, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: situation.name,
          url: absoluteUrl(
            base,
            localizedPath(locale, defaultLocale, `/situations/${situation.slug}`)
          ),
        })),
      },
    },
  ];
}

/**
 * @param {object} params
 * @param {string} params.base
 * @param {string} params.locale
 * @param {string} params.defaultLocale
 * @param {string} params.homeLabel
 * @param {string} params.situationsHubLabel
 * @param {string} params.situationTitle
 */
export function buildSituationPageBreadcrumbJsonLd({
  base,
  locale,
  defaultLocale,
  homeLabel,
  situationsHubLabel,
  situationTitle,
}) {
  return buildBreadcrumbListJsonLd({
    base,
    locale,
    defaultLocale,
    items: [
      { label: homeLabel, path: "/" },
      { label: situationsHubLabel, path: "/situations" },
      { label: situationTitle },
    ],
  });
}
