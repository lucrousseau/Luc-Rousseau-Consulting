/**
 * Dynamic sitemap.xml for SEO with geo-targeting.
 * Served at /sitemap.xml via rewrite in next.config.mjs.
 */

import type { NextApiRequest, NextApiResponse } from "next";

import { apiRequireGet } from "../../utils/apiRequireGet";
import { getSiteOrigin } from "../../utils/siteOrigin";
import {
  getRouteAlternateUrls,
  getSituationAlternateUrls,
  getExpertiseAlternateUrls,
  ROUTES,
  type LocaleAlternateUrls,
} from "../../commons/siteRoutes";
import { SITUATIONS } from "../../commons/situationsManifest";
import { EXPERTISE_PAGES } from "../../commons/expertiseManifest";

const DEFAULT_LOCALE = "fr";

interface SitemapUrlEntry {
  loc: string;
  priority: string;
  changefreq: string;
  geo?: boolean;
  lastmod?: string;
  hreflang: LocaleAlternateUrls;
}

function hreflangLinks(frLoc: string, enLoc: string, defaultUrl: string): string {
  return `    <xhtml:link rel="alternate" hreflang="fr" href="${frLoc}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${enLoc}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${defaultUrl}"/>`;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!apiRequireGet(req, res)) return;

  const base = getSiteOrigin(req);
  const now = new Date().toISOString().slice(0, 10);

  const homeAlternates = getRouteAlternateUrls(base, ROUTES.home, DEFAULT_LOCALE);
  const situationsHubAlternates = getRouteAlternateUrls(base, ROUTES.situationsHub, DEFAULT_LOCALE);

  const urls: SitemapUrlEntry[] = [
    {
      loc: homeAlternates.fr,
      priority: "1.0",
      changefreq: "weekly",
      geo: true,
      hreflang: homeAlternates,
    },
    {
      loc: homeAlternates.en,
      priority: "1.0",
      changefreq: "weekly",
      geo: true,
      hreflang: homeAlternates,
    },
    {
      loc: situationsHubAlternates.fr,
      priority: "0.8",
      changefreq: "monthly",
      hreflang: situationsHubAlternates,
    },
    {
      loc: situationsHubAlternates.en,
      priority: "0.8",
      changefreq: "monthly",
      hreflang: situationsHubAlternates,
    },
    ...SITUATIONS.flatMap((situation) => {
      const alternates = getSituationAlternateUrls(base, situation, DEFAULT_LOCALE);

      return [
        {
          loc: alternates.fr,
          priority: "0.7",
          changefreq: "monthly",
          lastmod: situation.publishedAt,
          hreflang: alternates,
        },
        {
          loc: alternates.en,
          priority: "0.7",
          changefreq: "monthly",
          lastmod: situation.publishedAt,
          hreflang: alternates,
        },
      ];
    }),
    ...EXPERTISE_PAGES.flatMap((page) => {
      const alternates = getExpertiseAlternateUrls(base, page, DEFAULT_LOCALE);

      return [
        {
          loc: alternates.fr,
          priority: "0.6",
          changefreq: "monthly",
          lastmod: page.publishedAt,
          hreflang: alternates,
        },
        {
          loc: alternates.en,
          priority: "0.6",
          changefreq: "monthly",
          lastmod: page.publishedAt,
          hreflang: alternates,
        },
      ];
    }),
  ];

  const urlset = urls
    .map(({ loc, priority, changefreq, geo, lastmod, hreflang }) => {
      const lastmodTag = lastmod
        ? `\n    <lastmod>${lastmod}</lastmod>`
        : `\n    <lastmod>${now}</lastmod>`;
      return `  <url>
    <loc>${loc}</loc>${lastmodTag}
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
${hreflangLinks(hreflang.fr, hreflang.en, hreflang.default)}${
        geo
          ? `
    <geo:geo xmlns:geo="http://www.google.com/geo/schemas/sitemap/1.0">
      <geo:format>kml</geo:format>
    </geo:geo>`
          : ""
      }
  </url>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:geo="http://www.google.com/geo/schemas/sitemap/1.0"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlset}
</urlset>`;

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate");
  res.status(200).send(xml);
}
