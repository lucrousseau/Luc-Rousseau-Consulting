import type { IncomingMessage, ServerResponse } from "http";

export function apiRequireGet(req: IncomingMessage, res: ServerResponse): boolean {
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.statusCode = 405;
    res.setHeader("Allow", "GET, HEAD");
    res.end("Method Not Allowed");
    return false;
  }
  return true;
}
