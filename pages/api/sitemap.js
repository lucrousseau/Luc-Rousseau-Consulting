/**
 * Dynamic sitemap.xml for SEO.
 * Served at /sitemap.xml via rewrite in next.config.mjs.
 * Domain from request host (or NEXT_PUBLIC_DOMAIN in .env).
 */

import { getSiteOrigin } from "../../utils/siteOrigin";

const ZINE_SLUGS = ["01-mex", "02-prt-hun-ita", "03-ist", "04-cai", "05-gre-esp-fra"];

export default function handler(req, res) {
  const base = getSiteOrigin(req);
  const now = new Date().toISOString().slice(0, 10);

  const urls = [
    { path: "", priority: "1.0", changefreq: "weekly" },
    { path: "fr", priority: "1.0", changefreq: "weekly" },
    { path: "zines", priority: "0.9", changefreq: "monthly" },
    { path: "fr/zines", priority: "0.9", changefreq: "monthly" },
    ...ZINE_SLUGS.flatMap((slug) => [
      { path: `zines/${slug}`, priority: "0.8", changefreq: "monthly" },
      { path: `fr/zines/${slug}`, priority: "0.8", changefreq: "monthly" },
    ]),
  ];

  const urlset = urls
    .map(
      ({ path, priority, changefreq }) =>
        `  <url>
    <loc>${base}/${path}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlset}
</urlset>`;

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate");
  res.status(200).send(xml);
}
