import { LOCALE_COOKIE, LOCALE_COOKIE_MAX_AGE, localeFromDocumentCookie } from "./localePreference";

/**
 * Client locale preference: **localStorage is the source of truth**.
 * The `lrc-locale` cookie is kept in sync so Edge middleware can redirect before paint
 * (middleware cannot read localStorage).
 */

function cookieLine(locale) {
  const secure =
    typeof window !== "undefined" && window.location.protocol === "https:" ? "; Secure" : "";
  return `${LOCALE_COOKIE}=${locale}; Path=/; Max-Age=${LOCALE_COOKIE_MAX_AGE}; SameSite=Lax${secure}`;
}

/**
 * One-time: copy cookie → localStorage if storage was empty (older sessions).
 */
export function migrateCookiePreferenceToLocalStorage() {
  if (typeof window === "undefined" || typeof localStorage === "undefined") return;
  try {
    if (localStorage.getItem(LOCALE_COOKIE)) return;
    const fromCookie = localeFromDocumentCookie(document.cookie);
    if (fromCookie) {
      localStorage.setItem(LOCALE_COOKIE, fromCookie);
    }
  } catch {
    // private mode / blocked storage
  }
}

/** Rewrite cookie from localStorage so the next full request hits middleware with the right hint. */
export function syncLocalePreferenceToCookie() {
  if (typeof document === "undefined") return;
  try {
    if (typeof localStorage === "undefined") return;
    const ls = localStorage.getItem(LOCALE_COOKIE);
    if (ls === "en" || ls === "fr") {
      document.cookie = cookieLine(ls);
    }
  } catch {
    // ignore
  }
}

/**
 * Resolved preference: localStorage wins, then cookie fallback.
 * @returns {"en" | "fr" | null}
 */
export function getLocalePreferenceClient() {
  if (typeof window === "undefined") return null;
  try {
    if (typeof localStorage !== "undefined") {
      const ls = localStorage.getItem(LOCALE_COOKIE);
      if (ls === "en" || ls === "fr") return ls;
    }
  } catch {
    // ignore
  }
  if (typeof document === "undefined") return null;
  return localeFromDocumentCookie(document.cookie);
}

/**
 * Persist explicit language choice (language switcher). Call before navigation.
 * @param {"en" | "fr"} locale
 */
export function setLocalePreferenceClient(locale) {
  if (typeof window === "undefined") return;
  if (locale !== "en" && locale !== "fr") return;
  try {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(LOCALE_COOKIE, locale);
    }
  } catch {
    // still set cookie below
  }
  if (typeof document !== "undefined") {
    document.cookie = cookieLine(locale);
  }
}
