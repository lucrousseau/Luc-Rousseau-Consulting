/**
 * Locale preference for middleware (Edge-safe: no `document` / Node-only APIs).
 *
 * SEO: crawlers and audit tools skip Accept-Language / cookie redirects so Google
 * always receives the URL it requested (see middleware.js). hreflang stays the
 * source of truth for locale relationships.
 */

export const LOCALE_COOKIE = "lrc-locale";
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

/**
 * @param {string | undefined} userAgent
 * @returns {boolean}
 */
export function isLikelyBot(userAgent) {
  if (!userAgent) return false;
  const ua = userAgent.toLowerCase();
  const bots = [
    "googlebot",
    "google-inspectiontool",
    "storebot-google",
    "googleother",
    "adsbot-google",
    "mediapartners-google",
    "bingbot",
    "slurp",
    "duckduckbot",
    "baiduspider",
    "yandexbot",
    "yandex",
    "facebookexternalhit",
    "linkedinbot",
    "twitterbot",
    "pinterest",
    "embedly",
    "slackbot",
    "discordbot",
    "telegrambot",
    "whatsapp",
    "ahrefsbot",
    "semrushbot",
    "mj12bot",
    "dotbot",
    "petalbot",
    "applebot",
    "ia_archiver",
    "chrome-lighthouse",
    "pagespeed",
    "gtmetrix",
    "uptimerobot",
    "pingdom",
    "prerender",
    "headlesschrome",
  ];
  return bots.some((b) => ua.includes(b));
}

/**
 * First language in Accept-Language, mapped to our locales only.
 * @param {string | null} header
 * @returns {"en" | "fr" | null}
 */
export function preferredLocaleFromAcceptLanguage(header) {
  if (!header || typeof header !== "string") return null;
  const first = header.split(",")[0]?.trim()?.split(";")[0]?.trim()?.toLowerCase() || "";
  if (first.startsWith("en")) return "en";
  if (first.startsWith("fr")) return "fr";
  return null;
}

/**
 * @param {string | undefined} value raw cookie value
 * @returns {"en" | "fr" | null}
 */
export function localeFromCookieValue(value) {
  if (value === "en" || value === "fr") return value;
  return null;
}

/**
 * Parse `document.cookie` string for lrc-locale (client-side).
 * @param {string} documentCookie
 * @returns {"en" | "fr" | null}
 */
export function localeFromDocumentCookie(documentCookie) {
  if (!documentCookie) return null;
  const re = new RegExp(`(?:^|;\\s*)${LOCALE_COOKIE}=(en|fr)(?:;|$)`);
  const m = documentCookie.match(re);
  return m ? /** @type {"en" | "fr"} */ (m[1]) : null;
}
