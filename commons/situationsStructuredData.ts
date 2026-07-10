import { absoluteUrl, localizedPath } from "./localizedPath";
import { ROUTES } from "./siteRoutes";

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbListParams {
  base: string;
  locale: string;
  defaultLocale: string;
  items: BreadcrumbItem[];
}

interface ListItemJsonLd {
  "@type": string;
  position: number;
  name: string;
  item?: string;
}

export function buildBreadcrumbListJsonLd({
  base,
  locale,
  defaultLocale,
  items,
}: BreadcrumbListParams): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => {
      const entry: ListItemJsonLd = {
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

interface SituationListItem {
  path: string;
  name: string;
}

interface SituationsHubJsonLdParams {
  base: string;
  locale: string;
  defaultLocale: string;
  pageUrl: string;
  pageName: string;
  pageDescription: string;
  homeLabel: string;
  situationsHubLabel: string;
  situations: SituationListItem[];
}

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
}: SituationsHubJsonLdParams): Record<string, unknown>[] {
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

interface SituationPageBreadcrumbParams {
  base: string;
  locale: string;
  defaultLocale: string;
  homeLabel: string;
  situationsHubLabel: string;
  situationTitle: string;
  pageUrl?: string;
}

export function buildSituationPageBreadcrumbJsonLd({
  base,
  locale,
  defaultLocale,
  homeLabel,
  situationsHubLabel,
  situationTitle,
  pageUrl,
}: SituationPageBreadcrumbParams): Record<string, unknown> {
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

/** Shared WebPage JSON-LD payload for block-driven detail pages. */
interface ContentPageWebPageParams {
  base: string;
  locale: string;
  defaultLocale: string;
  pageUrl: string;
  pageName: string;
  pageDescription: string;
  breadcrumb: Record<string, unknown>;
  datePublished?: string;
  dateModified?: string;
}

export function buildContentPageWebPageJsonLd({
  base,
  locale,
  defaultLocale,
  pageUrl,
  pageName,
  pageDescription,
  breadcrumb,
  datePublished,
  dateModified,
}: ContentPageWebPageParams): Record<string, unknown> {
  const inLanguage = locale === "fr" ? "fr-CA" : "en-CA";
  const siteUrl = absoluteUrl(base, localizedPath(locale, defaultLocale, ROUTES.home));

  const webPage: Record<string, unknown> = {
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

  breadcrumb["@id"] = `${pageUrl}#breadcrumb`;

  return webPage;
}

/** Breadcrumb + WebPage JSON-LD for a single situation page. */
interface SituationPageJsonLdParams {
  base: string;
  locale: string;
  defaultLocale: string;
  pageUrl: string;
  pageName: string;
  pageDescription: string;
  homeLabel: string;
  situationsHubLabel: string;
  datePublished?: string;
  dateModified?: string;
}

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
}: SituationPageJsonLdParams): Record<string, unknown>[] {
  const breadcrumb = buildSituationPageBreadcrumbJsonLd({
    base,
    locale,
    defaultLocale,
    homeLabel,
    situationsHubLabel,
    situationTitle: pageName,
    pageUrl,
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
