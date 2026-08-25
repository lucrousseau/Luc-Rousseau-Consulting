import type { NextApiRequest, NextApiResponse } from "next";

import { apiRequireGet } from "../../utils/apiRequireGet";
import { sendApiJsonError } from "../../utils/apiJsonError";
import { getSiteOrigin } from "../../utils/siteOrigin";

/**
 * Catch-all for unknown /api/* paths.
 * Specific route files win over this handler; unknown paths get JSON 404.
 */
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!apiRequireGet(req, res)) return;

  const base = getSiteOrigin(req);
  sendApiJsonError(
    res,
    404,
    "not_found",
    "No API endpoint matches this path.",
    `See ${base}/openapi.json and ${base}/developers for Luc Rousseau public endpoints.`
  );
}
