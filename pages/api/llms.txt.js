/**
 * llms.txt for LLM crawlers and agents (Claude, Perplexity, etc.)
 * Served at /llms.txt via rewrite in next.config.mjs.
 * @see https://llmstxt.org/
 */

import { apiRequireGet } from "../../utils/apiRequireGet";
import { getSiteOrigin } from "../../utils/siteOrigin";
import { buildLlmsTxt } from "../../commons/llmSignal";

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default function handler(req, res) {
  if (!apiRequireGet(req, res)) return;

  const base = getSiteOrigin(req);
  const body = buildLlmsTxt(base);

  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate");
  res.status(200).send(body);
}
