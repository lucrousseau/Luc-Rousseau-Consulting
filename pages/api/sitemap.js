/**
 * Dynamic sitemap.xml for SEO with geo-targeting.
 * Served at /sitemap.xml via rewrite in next.config.mjs.
 * Domain from request host (or NEXT_PUBLIC_DOMAIN in .env).
 * Includes geo:geo namespace for geographic targeting (Quebec, Canada).
 */

import { apiRequireGet } from "../../utils/apiRequireGet";
import { getSiteOrigin } from "../../utils/siteOrigin";

export default function handler(req, res) {
  if (!apiRequireGet(req, res)) return;

  const base = getSiteOrigin(req);
  const now = new Date().toISOString().slice(0, 10);

  // Geo coordinates for Quebec, Montreal
  // Latitude: 45.5017, Longitude: -73.5673
  const geoLat = "45.5017";
  const geoLong = "-73.5673";

  const frUrl = `${base}/`;
  const enUrl = `${base}/en`;

  const hreflangLinks = (
    defaultUrl
  ) => `    <xhtml:link rel="alternate" hreflang="fr" href="${frUrl}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${enUrl}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${defaultUrl}"/>`;

  const urls = [
    { loc: frUrl, priority: "1.0", changefreq: "weekly", geo: true, hreflangDefault: frUrl },
    { loc: enUrl, priority: "1.0", changefreq: "weekly", geo: true, hreflangDefault: frUrl },
  ];

  const urlset = urls
    .map(
      ({ loc, priority, changefreq, geo, hreflangDefault }) =>
        `  <url>
    <loc>${loc}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
${hreflangLinks(hreflangDefault)}${
          geo
            ? `
    <geo:geo xmlns:geo="http://www.google.com/geo/schemas/sitemap/1.0">
      <geo:format>kml</geo:format>
    </geo:geo>`
            : ""
        }
  </url>`
    )
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
