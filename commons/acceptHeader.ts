/**
 * Accept header parsing for content negotiation (acceptmarkdown.com).
 * Ranks media types by q-value, then specificity
 * (type/subtype > type/* > star/star).
 */

export type AcceptMediaRange = {
  type: string;
  q: number;
  specificity: number;
};

function specificityOf(type: string): number {
  if (type === "*/*") return 0;
  if (type.endsWith("/*")) return 1;
  return 2;
}

/** Parse and sort an Accept header (highest preference first). */
export function parseAcceptHeader(header: string | null | undefined): AcceptMediaRange[] {
  if (header == null || !String(header).trim()) {
    return [{ type: "*/*", q: 1, specificity: 0 }];
  }

  const ranges: AcceptMediaRange[] = [];

  for (const part of String(header).split(",")) {
    const segments = part
      .trim()
      .split(";")
      .map((s) => s.trim());
    const rawType = (segments[0] || "").toLowerCase();
    if (!rawType) continue;

    let q = 1;
    for (let i = 1; i < segments.length; i += 1) {
      const [key, rawValue] = segments[i].split("=").map((s) => s.trim());
      if (key.toLowerCase() !== "q") continue;
      const parsed = Number.parseFloat(rawValue);
      q = Number.isFinite(parsed) ? Math.min(1, Math.max(0, parsed)) : 0;
    }

    ranges.push({
      type: rawType,
      q,
      specificity: specificityOf(rawType),
    });
  }

  if (ranges.length === 0) {
    return [{ type: "*/*", q: 1, specificity: 0 }];
  }

  return ranges.sort((a, b) => {
    if (b.q !== a.q) return b.q - a.q;
    return b.specificity - a.specificity;
  });
}

function matchesType(rangeType: string, concrete: string): boolean {
  if (rangeType === "*/*") return true;
  if (rangeType.endsWith("/*")) {
    return concrete.startsWith(rangeType.slice(0, -1));
  }
  return rangeType === concrete;
}

/**
 * Among the representations this server can produce, pick the best match
 * for the client's Accept header. Returns null only when every available
 * type is explicitly refused (q=0) and no wildcard remains.
 */
export function negotiateMediaType(
  acceptHeader: string | null | undefined,
  available: readonly string[]
): string | null {
  const ranges = parseAcceptHeader(acceptHeader);

  for (const range of ranges) {
    if (range.q <= 0) continue;
    for (const candidate of available) {
      if (matchesType(range.type, candidate)) {
        return candidate;
      }
    }
  }

  return null;
}

/** True when text/markdown outranks text/html for this Accept value. */
export function prefersMarkdown(acceptHeader: string | null | undefined): boolean {
  // Prefer HTML when the client only sends wildcards (e.g. curl Accept: */*).
  // text/markdown wins when it outranks text/html by q-value / specificity.
  return negotiateMediaType(acceptHeader, ["text/html", "text/markdown"]) === "text/markdown";
}
