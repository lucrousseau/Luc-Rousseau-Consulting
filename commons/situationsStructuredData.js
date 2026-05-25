import { absoluteUrl, localizedPath } from "./localizedPath";
import { ROUTES } from "./siteRoutes";

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
 * @param {{ path: string; name: string }[]} params.situations
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
      items: [{ label: homeLabel, path: ROUTES.home }, { label: situationsHubLabel }],
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
          url: absoluteUrl(base, localizedPath(locale, defaultLocale, situation.path)),
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
  pageUrl,
}) {
  const breadcrumb = buildBreadcrumbListJsonLd({
    base,
    locale,
    defaultLocale,
    items: [
      { label: homeLabel, path: ROUTES.home },
      { label: situationsHubLabel, path: ROUTES.situationsHub },
      { label: situationTitle },
    ],
  });

  if (pageUrl) {
    breadcrumb["@id"] = `${pageUrl}#breadcrumb`;
  }

  return breadcrumb;
}

/**
 * Breadcrumb + WebPage JSON-LD for a single situation page.
 * @param {object} params
 * @param {string} params.base
 * @param {string} params.locale
 * @param {string} params.defaultLocale
 * @param {string} params.pageUrl
 * @param {string} params.pageName visible H1 / headline
 * @param {string} params.pageDescription meta description
 * @param {string} params.homeLabel
 * @param {string} params.situationsHubLabel
 * @param {string} [params.datePublished] ISO date
 * @param {string} [params.dateModified] ISO date
 * @returns {object[]}
 */
export function buildSituationPageJsonLd({
  base,
  locale,
  defaultLocale,
  pageUrl,
  pageName,
  pageDescription,
  homeLabel,
  situationsHubLabel,
  datePublished,
  dateModified,
}) {
  const inLanguage = locale === "fr" ? "fr-CA" : "en-CA";
  const siteUrl = absoluteUrl(base, localizedPath(locale, defaultLocale, "/"));

  const breadcrumb = buildSituationPageBreadcrumbJsonLd({
    base,
    locale,
    defaultLocale,
    homeLabel,
    situationsHubLabel,
    situationTitle: pageName,
    pageUrl,
  });

  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: pageName,
    description: pageDescription,
    inLanguage,
    isPartOf: {
      "@type": "WebSite",
      name: "Luc Rousseau",
      url: siteUrl,
    },
    breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
    about: {
      "@type": "Service",
      name: pageName,
      description: pageDescription,
      areaServed: {
        "@type": "Country",
        name: "Canada",
      },
      provider: {
        "@type": "Person",
        name: "Luc Rousseau",
        url: siteUrl,
      },
    },
  };

  if (datePublished) {
    webPage.datePublished = datePublished;
  }
  if (dateModified) {
    webPage.dateModified = dateModified;
  }

  return [breadcrumb, webPage];
}
