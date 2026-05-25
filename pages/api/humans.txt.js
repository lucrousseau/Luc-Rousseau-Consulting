/**
 * humans.txt: human attribution for the site (humans.txt standard).
 * Served at /humans.txt via rewrite in next.config.mjs.
 * @see https://humanstxt.org/
 */

import { apiRequireGet } from "../../utils/apiRequireGet";
import { getSiteOrigin } from "../../utils/siteOrigin";
import { buildHumansTxt } from "../../commons/llmSignal";

export default function handler(req, res) {
  if (!apiRequireGet(req, res)) return;

  const base = getSiteOrigin(req);
  const body = buildHumansTxt(base);

  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate");
  res.status(200).send(body);
}
