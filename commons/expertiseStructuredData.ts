import {
  buildBreadcrumbListJsonLd,
  buildContentPageWebPageJsonLd,
} from "./situationsStructuredData";
import { ROUTES } from "./siteRoutes";

/** Breadcrumb + WebPage JSON-LD for an expertise (SEO satellite) page. */
interface ExpertisePageJsonLdParams {
  base: string;
  locale: string;
  defaultLocale: string;
  pageUrl: string;
  pageName: string;
  pageDescription: string;
  homeLabel: string;
  datePublished?: string;
  dateModified?: string;
}

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
}: ExpertisePageJsonLdParams): Record<string, unknown>[] {
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
