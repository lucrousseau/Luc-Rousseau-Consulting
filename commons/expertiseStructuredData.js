import { buildBreadcrumbListJsonLd } from "./situationsStructuredData";
import { absoluteUrl, localizedPath } from "./localizedPath";
import { ROUTES } from "./siteRoutes";

/**
 * Breadcrumb + WebPage JSON-LD for an expertise (SEO satellite) page.
 * @param {object} params
 * @param {string} params.base
 * @param {string} params.locale
 * @param {string} params.defaultLocale
 * @param {string} params.pageUrl
 * @param {string} params.pageName visible H1 / headline
 * @param {string} params.pageDescription meta description
 * @param {string} params.homeLabel
 * @param {string} [params.datePublished] ISO date
 * @param {string} [params.dateModified] ISO date
 * @returns {object[]}
 */
export function buildExpertisePageJsonLd({
  base,
  locale,
  defaultLocale,
  pageUrl,
  pageName,
  pageDescription,
  homeLabel,
  datePublished,
  dateModified,
}) {
  const inLanguage = locale === "fr" ? "fr-CA" : "en-CA";
  const siteUrl = absoluteUrl(base, localizedPath(locale, defaultLocale, ROUTES.home));

  const breadcrumb = buildBreadcrumbListJsonLd({
    base,
    locale,
    defaultLocale,
    items: [{ label: homeLabel, path: ROUTES.home }, { label: pageName }],
  });
  breadcrumb["@id"] = `${pageUrl}#breadcrumb`;

  /** @type {Record<string, unknown>} */
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
