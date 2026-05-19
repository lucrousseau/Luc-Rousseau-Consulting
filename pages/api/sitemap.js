/**
 * Dynamic sitemap.xml for SEO with geo-targeting.
 * Served at /sitemap.xml via rewrite in next.config.mjs.
 * Domain from request host (or NEXT_PUBLIC_DOMAIN in .env).
 * Includes geo:geo namespace for geographic targeting (Quebec, Canada).
 */

import { apiRequireGet } from "../../utils/apiRequireGet";
import { getSiteOrigin } from "../../utils/siteOrigin";
import { GUIDES } from "../../commons/guidesManifest";

export default function handler(req, res) {
  if (!apiRequireGet(req, res)) return;

  const base = getSiteOrigin(req);
  const now = new Date().toISOString().slice(0, 10);

  const frUrl = `${base}/`;
  const enUrl = `${base}/en`;

  const hreflangLinks = (frLoc, enLoc, defaultUrl) =>
    `    <xhtml:link rel="alternate" hreflang="fr" href="${frLoc}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${enLoc}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${defaultUrl}"/>`;

  const urls = [
    {
      loc: frUrl,
      priority: "1.0",
      changefreq: "weekly",
      geo: true,
      hreflang: { fr: frUrl, en: enUrl, default: frUrl },
    },
    {
      loc: enUrl,
      priority: "1.0",
      changefreq: "weekly",
      geo: true,
      hreflang: { fr: frUrl, en: enUrl, default: frUrl },
    },
    {
      loc: `${base}/guides`,
      priority: "0.8",
      changefreq: "monthly",
      hreflang: { fr: `${base}/guides`, en: `${base}/en/guides`, default: `${base}/guides` },
    },
    {
      loc: `${base}/en/guides`,
      priority: "0.8",
      changefreq: "monthly",
      hreflang: { fr: `${base}/guides`, en: `${base}/en/guides`, default: `${base}/guides` },
    },
    ...GUIDES.flatMap((guide) => [
      {
        loc: `${base}/guides/${guide.slug}`,
        priority: "0.7",
        changefreq: "monthly",
        lastmod: guide.publishedAt,
        hreflang: {
          fr: `${base}/guides/${guide.slug}`,
          en: `${base}/en/guides/${guide.slug}`,
          default: `${base}/guides/${guide.slug}`,
        },
      },
      {
        loc: `${base}/en/guides/${guide.slug}`,
        priority: "0.7",
        changefreq: "monthly",
        lastmod: guide.publishedAt,
        hreflang: {
          fr: `${base}/guides/${guide.slug}`,
          en: `${base}/en/guides/${guide.slug}`,
          default: `${base}/guides/${guide.slug}`,
        },
      },
    ]),
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
