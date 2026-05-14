import { LOCALE_COOKIE, LOCALE_COOKIE_MAX_AGE } from "./localePreference";

/**
 * Persist explicit language choice (Language switcher). Call before navigation.
 * @param {"en" | "fr"} locale
 */
export function setLocalePreferenceClient(locale) {
  if (typeof document === "undefined") return;
  if (locale !== "en" && locale !== "fr") return;
  const secure =
    typeof window !== "undefined" && window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${LOCALE_COOKIE}=${locale}; Path=/; Max-Age=${LOCALE_COOKIE_MAX_AGE}; SameSite=Lax${secure}`;
}
