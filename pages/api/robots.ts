import type { NextApiRequest, NextApiResponse } from "next";

import { apiRequireGet } from "../../utils/apiRequireGet";
import { getSiteOrigin } from "../../utils/siteOrigin";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!apiRequireGet(req, res)) return;

  const base = getSiteOrigin(req);
  const body = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /
Disallow: /cvs/
Disallow: /en/cvs/

Sitemap: ${base}/sitemap.xml

# LLM-readable site summary (llmstxt.org)
LLMs-Txt: ${base}/llms.txt
# Extended profile: ${base}/llms-full.txt
# Human attribution: ${base}/humans.txt

# Geo-targeting: KML file for geographic location
KML: ${base}/geo.kml
`;

  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate");
  res.status(200).send(body);
}
