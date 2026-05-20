/**
 * llms.txt for LLM crawlers and agents (Claude, Perplexity, etc.)
 * Served at /llms.txt via rewrite in next.config.mjs.
 * @see https://llmstxt.org/
 */

import { apiRequireGet } from "../../utils/apiRequireGet";
import { getSiteOrigin } from "../../utils/siteOrigin";
import { SITUATIONS } from "../../commons/situationsManifest";

export default function handler(req, res) {
  if (!apiRequireGet(req, res)) return;

  const base = getSiteOrigin(req);
  const body = `# Luc Rousseau

> Fractional Product Engineer specializing in technical architecture, systems design, and product execution. Based in Quebec, Canada. Retainer-based engagements for product and engineering leaders.

Location: Quebec, Canada (Montreal). Languages: French (default), English. Engagement: retainer-based recurring collaboration, not hourly rates, one-off projects, or day rates.

Services: product engineering, technical architecture, systems design, technical roadmap planning, technical debt reduction, delivery and execution supervision.

Expertise: decoupled systems, APIs, and CMS platforms (WordPress headless when editorial scale warrants it); Laravel and custom backend systems; technical leadership; CI/CD and delivery processes; multi-site and multi-market platforms.

## Pages

- [Home (French)](${base}/): Main site in French
- [Home (English)](${base}/en): English version
- [Situations (French)](${base}/situations): Quiz to find the page that matches your context
- [Situations (English)](${base}/en/situations): English situations index

## Situations (audience pages)

${SITUATIONS.map((s) => `- [${s.slug} (FR)](${base}/situations/${s.slug}) · [EN](${base}/en/situations/${s.slug})`).join("\n")}

## Contact

- [Email](mailto:hello@lucrousseau.com): hello@lucrousseau.com
- [Schedule a call](https://calendly.com/_lucrousseau/30min/)
- [LinkedIn](https://www.linkedin.com/in/lucrousseau/)

## Optional

- [Sitemap](${base}/sitemap.xml): Full list of indexable pages
- [Geo KML](${base}/geo.kml): Geographic location metadata
`;

  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate");
  res.status(200).send(body);
}
