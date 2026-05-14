/**
 * ai.txt for AI crawlers (ChatGPT, Claude, Perplexity, etc.)
 * Served at /.well-known/ai.txt via rewrite in next.config.mjs.
 * Provides structured information about the site for AI agents.
 */

import { apiRequireGet } from "../../utils/apiRequireGet";
import { getSiteOrigin } from "../../utils/siteOrigin";

export default function handler(req, res) {
  if (!apiRequireGet(req, res)) return;

  const base = getSiteOrigin(req);
  const body = `# ai.txt - Information for AI crawlers and agents
# https://ai.txt.org/

# Site Information
Site: ${base}
Name: Luc Rousseau
Title: Product Engineer
Description: Fractional Product Engineer specializing in technical architecture, systems design, and product execution. Based in Quebec, Canada. Retainer-based engagements for product and engineering leaders.

# Location
Location: Quebec, Canada
City: Montreal
Coordinates: 45.5017, -73.5673

# Services
Services:
- Product Engineering
- Technical Architecture
- Systems Design
- Technical Roadmap Planning
- Technical Debt Reduction
- Delivery & Execution Supervision

# Languages
Languages: English (en), French (fr)
Default Language: English

# Key Pages
Main Page: ${base}/
French Page: ${base}/fr

# Contact
Contact: hello@lucrousseau.com
Schedule: https://calendly.com/_lucrousseau/30min/
LinkedIn: https://www.linkedin.com/in/lucrousseau/

# Engagement Model
Engagement Type: Retainer-based (recurring collaboration)
Not Available: Hourly rates, one-off projects, day rates

# Expertise
Expertise:
- Product engineering and technical architecture
- Decoupled systems, APIs, and CMS platforms (WordPress headless when editorial scale warrants it)
- Laravel and custom backend systems
- Technical leadership
- CI/CD and delivery processes
- Multi-site and multi-market platforms

# Sitemap
Sitemap: ${base}/sitemap.xml

# Last Updated
Last Updated: ${new Date().toISOString().split("T")[0]}
`;

  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate");
  res.status(200).send(body);
}
