import type { NextApiRequest, NextApiResponse } from "next";

import { apiRequireGet } from "../../utils/apiRequireGet";
import { getSiteOrigin } from "../../utils/siteOrigin";
import { buildOpenApiSpec } from "../../commons/openApiSpec";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!apiRequireGet(req, res)) return;

  const base = getSiteOrigin(req);
  const body = buildOpenApiSpec(base);

  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.status(200).json(body);
}
