import {
  buildBreadcrumbListJsonLd,
  buildContentPageWebPageJsonLd,
} from "./situationsStructuredData";
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
  const breadcrumb = buildBreadcrumbListJsonLd({
    base,
    locale,
    defaultLocale,
    items: [{ label: homeLabel, path: ROUTES.home }, { label: pageName }],
  });

  const webPage = buildContentPageWebPageJsonLd({
    base,
    locale,
    defaultLocale,
    pageUrl,
    pageName,
    pageDescription,
    breadcrumb,
    datePublished,
    dateModified,
  });

  return [breadcrumb, webPage];
}
