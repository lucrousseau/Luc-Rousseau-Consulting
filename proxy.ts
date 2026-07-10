import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { findSituationSlugPair } from "./commons/situationSlugRoutes.mjs";

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

export function proxy(request: NextRequest) {
  const locale = request.nextUrl.locale === "en" ? "en" : "fr";
  const parsed = parseSituationPathname(request.nextUrl.pathname);

  if (!parsed) {
    return NextResponse.next();
  }

  const pair = findSituationSlugPair(parsed.slug);
  if (!pair || pair.slugFr === pair.slugEn) {
    return NextResponse.next();
  }

  const expectedSlug = locale === "en" ? pair.slugEn : pair.slugFr;
  if (parsed.slug === expectedSlug) {
    return NextResponse.next();
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

export const config = {
  matcher: ["/situations/:path*", "/guides/:path*"],
};
