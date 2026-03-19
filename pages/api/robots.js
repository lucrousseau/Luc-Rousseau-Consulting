/**
 * Dynamic robots.txt for SEO.
 * Served at /robots.txt via rewrite in next.config.mjs.
 * Sitemap URL uses request host (or NEXT_PUBLIC_DOMAIN).
 */

import { getSiteOrigin } from "../../utils/siteOrigin";

export default function handler(req, res) {
  const base = getSiteOrigin(req);
  const body = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

Sitemap: ${base}/sitemap.xml
# Geo-targeting: KML file for geographic location
# KML: ${base}/geo.kml
`;

  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate");
  res.status(200).send(body);
}
