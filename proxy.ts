import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { prefersMarkdown } from "./commons/acceptHeader";
import {
  buildNotFoundMarkdown,
  buildPageMarkdown,
  isKnownSitePath,
  normalizeRequestPathname,
} from "./commons/pageMarkdown";
import { findSituationSlugPair } from "./commons/situationSlugRoutes.mjs";

const VARY_ACCEPT = "Accept, Accept-Encoding";
const MARKDOWN_CONTENT_TYPE = "text/markdown; charset=utf-8";

function parseSituationPathname(
  pathname: string
): { slug: string; kind: "situations" | "guides" } | null {
  const situations = pathname.match(/^\/situations\/([^/]+)\/?$/);
  if (situations) {
    return { slug: situations[1], kind: "situations" };
  }

  const guides = pathname.match(/^\/guides\/([^/]+)\/?$/);
  if (guides) {
    return { slug: guides[1], kind: "guides" };
  }

  return null;
}

function requestOrigin(request: NextRequest): string {
  const fromEnv = process.env.NEXT_PUBLIC_DOMAIN?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  return request.nextUrl.origin;
}

function markdownResponse(body: string, status: number, method: string): NextResponse {
  const headers = {
    "Content-Type": MARKDOWN_CONTENT_TYPE,
    Vary: VARY_ACCEPT,
    "Cache-Control":
      status === 404
        ? "public, max-age=0, must-revalidate"
        : "public, s-maxage=86400, stale-while-revalidate=604800",
  };

  if (method === "HEAD") {
    return new NextResponse(null, { status, headers });
  }

  return new NextResponse(body, { status, headers });
}

function applyVaryAccept(response: NextResponse): NextResponse {
  const existing = response.headers.get("Vary");
  if (!existing) {
    response.headers.set("Vary", VARY_ACCEPT);
    return response;
  }

  const parts = existing.split(",").map((part) => part.trim().toLowerCase());
  if (!parts.includes("accept")) {
    response.headers.set("Vary", `${existing}, Accept`);
  }
  return response;
}

function handleSituationSlugCanonicalization(request: NextRequest): NextResponse | null {
  const locale = request.nextUrl.locale === "en" ? "en" : "fr";
  const parsed = parseSituationPathname(request.nextUrl.pathname);

  if (!parsed) {
    return null;
  }

  const pair = findSituationSlugPair(parsed.slug);
  if (!pair || pair.slugFr === pair.slugEn) {
    return null;
  }

  const expectedSlug = locale === "en" ? pair.slugEn : pair.slugFr;
  if (parsed.slug === expectedSlug) {
    return null;
  }

  if (parsed.kind === "guides" && locale === "fr") {
    return NextResponse.redirect(new URL(`/situations/${pair.slugFr}`, request.url), 308);
  }

  if (parsed.kind === "guides" && locale === "en") {
    return NextResponse.redirect(new URL(`/en/situations/${pair.slugEn}`, request.url), 308);
  }

  const destination =
    locale === "en" ? `/en/situations/${pair.slugEn}` : `/situations/${pair.slugFr}`;

  return NextResponse.redirect(new URL(destination, request.url), 308);
}

export function proxy(request: NextRequest) {
  const slugRedirect = handleSituationSlugCanonicalization(request);
  if (slugRedirect) {
    return slugRedirect;
  }

  const accept = request.headers.get("accept");
  const wantsMarkdown = prefersMarkdown(accept);
  // Pages i18n: locale lives on nextUrl.locale; pathname has no /en prefix.
  const locale = request.nextUrl.locale === "en" ? "en" : "fr";
  const path = normalizeRequestPathname(request.nextUrl.pathname).path;
  const base = requestOrigin(request);

  if (wantsMarkdown) {
    const pageMarkdown = buildPageMarkdown(base, path, locale);
    if (pageMarkdown) {
      return markdownResponse(pageMarkdown, 200, request.method);
    }

    if (!isKnownSitePath(path)) {
      return markdownResponse(buildNotFoundMarkdown(base), 404, request.method);
    }
  }

  return applyVaryAccept(NextResponse.next());
}

export const config = {
  matcher: [
    /*
     * Include `/` explicitly: the catch-all below does not match the site root.
     * Negotiate markdown on public pages; skip API, Next internals, and static files.
     * Situation/guide slug canonicalization also runs here.
     */
    "/",
    "/((?!api/|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
