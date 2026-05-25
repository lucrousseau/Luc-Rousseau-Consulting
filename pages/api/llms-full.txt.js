/**
 * llms-full.txt: extended LLM-readable positioning document.
 * Served at /llms-full.txt via rewrite in next.config.mjs.
 * @see https://llmstxt.org/
 */

import { apiRequireGet } from "../../utils/apiRequireGet";
import { getSiteOrigin } from "../../utils/siteOrigin";
import { buildLlmsFullTxt } from "../../commons/llmSignal";

export default function handler(req, res) {
  if (!apiRequireGet(req, res)) return;

  const base = getSiteOrigin(req);
  const body = buildLlmsFullTxt(base);

  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate");
  res.status(200).send(body);
}
