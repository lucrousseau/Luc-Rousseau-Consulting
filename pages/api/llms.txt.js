/**
 * llms.txt for LLM crawlers and agents (Claude, Perplexity, etc.)
 * Served at /llms.txt via rewrite in next.config.mjs.
 * @see https://llmstxt.org/
 */

import { apiRequireGet } from "../../utils/apiRequireGet";
import { getSiteOrigin } from "../../utils/siteOrigin";
import { SITUATIONS } from "../../commons/situationsManifest";
import { getSituationSeo } from "../../commons/situationSeoMeta";

export default function handler(req, res) {
  if (!apiRequireGet(req, res)) return;

  const base = getSiteOrigin(req);
  const body = `# Luc Rousseau

> Fractional Product Engineer specializing in technical architecture, systems design, and product execution. Based in Quebec, Canada. Retainer-based engagements for product and engineering leaders.

Location: Quebec, Canada (Montreal). Languages: French (default), English. Engagement: retainer-based recurring collaboration, not hourly rates, one-off projects, or day rates.

Services: product engineering, technical architecture, systems design, technical roadmap planning, technical debt reduction, delivery and execution supervision.

Expertise: decoupled systems, APIs, and CMS platforms (archaic WordPress modernization: headless WPGraphQL/REST, Laravel admin and API, phased migration without big bang; headless WordPress when editorial scale warrants it); editorial product platforms at scale (comparators, conversion, partnerships, monetization, Gutenberg blocks, high-traffic journeys); post-funding first technical hire (fractional senior principal developer, two days a week, four-step product and build path); SaaS and MVP launch (fractional mandate, four steps: feasibility, architecture, prototypes, handover; CEO/CTO validation with Lovable/Cursor/Claude; written phases, prioritized backlog, steering in-house devs or agency before big build spend); Laravel and custom backend systems; technical leadership; CI/CD and delivery processes; multi-site and multi-market platforms.

## Pages

- [Home (French)](${base}/): Main site in French
- [Home (English)](${base}/en): English version
- [Situations (French)](${base}/situations): Quiz to find the page that matches your context
- [Situations (English)](${base}/en/situations): English situations index

## Situations (audience pages)

${SITUATIONS.map((situation) => {
  const fr = getSituationSeo("fr", situation.namespace);
  const en = getSituationSeo("en", situation.namespace);
  return `### ${fr.headline}
- Slug: \`${situation.slug}\`
- EN title: ${en.headline}
- FR summary: ${fr.description}
- EN summary: ${en.description}
- [French page](${base}/situations/${situation.slug}) · [English page](${base}/en/situations/${situation.slug})`;
}).join("\n\n")}

## Contact

- [Email](mailto:hello@lucrousseau.com): hello@lucrousseau.com
- [Schedule a call](https://calendly.com/_lucrousseau/30min/)
- [LinkedIn](https://www.linkedin.com/in/lucrousseau/)

## Optional

- [Sitemap](${base}/sitemap.xml): Full list of indexable pages
- [llms.txt](${base}/llms.txt): This file
- [Geo KML](${base}/geo.kml): Geographic location metadata
`;

  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate");
  res.status(200).send(body);
}
