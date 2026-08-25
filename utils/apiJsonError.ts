import type { ServerResponse } from "http";

export type ApiErrorBody = {
  error: {
    code: string;
    message: string;
    status: number;
    hint: string;
  };
};

/** Structured JSON error body for public API routes (agent-parseable). */
export function buildApiErrorBody(
  status: number,
  code: string,
  message: string,
  hint: string
): ApiErrorBody {
  return {
    error: {
      code,
      message,
      status,
      hint,
    },
  };
}

export function sendApiJsonError(
  res: ServerResponse,
  status: number,
  code: string,
  message: string,
  hint: string,
  extraHeaders?: Record<string, string>
): void {
  const body = buildApiErrorBody(status, code, message, hint);
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  if (extraHeaders) {
    for (const [key, value] of Object.entries(extraHeaders)) {
      res.setHeader(key, value);
    }
  }
  res.end(JSON.stringify(body));
}
