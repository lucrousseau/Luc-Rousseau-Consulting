import type { IncomingMessage, ServerResponse } from "http";

import { sendApiJsonError } from "./apiJsonError";

export function apiRequireGet(req: IncomingMessage, res: ServerResponse): boolean {
  if (req.method !== "GET" && req.method !== "HEAD") {
    sendApiJsonError(
      res,
      405,
      "method_not_allowed",
      "Only GET and HEAD are supported on this endpoint.",
      "Retry with GET or HEAD. See /openapi.json for the Luc Rousseau public API surface.",
      { Allow: "GET, HEAD" }
    );
    return false;
  }
  return true;
}
