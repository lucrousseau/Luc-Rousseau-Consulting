import { NextResponse } from "next/server";

import {
  isLikelyBot,
  localeFromCookieValue,
  LOCALE_COOKIE,
  preferredLocaleFromAcceptLanguage,
} from "./utils/localePreference";

/**
 * Locale routing (cookie + Accept-Language) without hurting SEO:
 * - Search-engine / preview / Lighthouse bots: no redirect (they crawl the URL they request).
 * - Explicit cookie (language switcher): honor `en` ↔ `/en`, `fr` ↔ `/`.
 * - No cookie, human on `/`: if Accept-Language prefers English → temporary redirect to `/en`.
 *
 * Uses 302 so `/` is not "permanently" another URL for crawlers that ignore middleware.
 * hreflang + canonicals in `<SEO />` remain the primary locale signals for indexing.
 */
export function middleware(request) {
  const { pathname } = request.nextUrl;
  const ua = request.headers.get("user-agent") || "";

  if (isLikelyBot(ua)) {
    return NextResponse.next();
  }

  const cookieLocale = localeFromCookieValue(request.cookies.get(LOCALE_COOKIE)?.value);
  const accept = request.headers.get("accept-language");

  if (cookieLocale === "fr" && (pathname === "/en" || pathname.startsWith("/en/"))) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url, 302);
  }

  if (cookieLocale === "en" && pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = "/en";
    return NextResponse.redirect(url, 302);
  }

  if (cookieLocale === null && pathname === "/") {
    if (preferredLocaleFromAcceptLanguage(accept) === "en") {
      const url = request.nextUrl.clone();
      url.pathname = "/en";
      return NextResponse.redirect(url, 302);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/en", "/en/:path*"],
};
