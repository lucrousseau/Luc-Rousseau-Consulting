/**
 * Dynamic sitemap.xml for SEO.
 * Served at /sitemap.xml via rewrite in next.config.mjs.
 * Domain from request host (or NEXT_PUBLIC_DOMAIN in .env).
 */

import { getSiteOrigin } from "../../utils/siteOrigin";

export default function handler(req, res) {
  const base = getSiteOrigin(req);
  const now = new Date().toISOString().slice(0, 10);

  const urls = [
    { path: "", priority: "1.0", changefreq: "weekly" },
    { path: "fr", priority: "1.0", changefreq: "weekly" },
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
