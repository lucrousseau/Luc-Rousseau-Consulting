import { useEffect } from "react";
import { useRouter } from "next/router";

import {
  getLocalePreferenceClient,
  migrateCookiePreferenceToLocalStorage,
  syncLocalePreferenceToCookie,
} from "../utils/setLocalePreferenceClient";

/**
 * Keeps cookie aligned with localStorage, migrates old cookie-only prefs, and
 * client-corrects locale when storage disagrees with the URL (middleware already ran).
 */
export default function LocalePreferenceEffect() {
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady || typeof window === "undefined") return;

    migrateCookiePreferenceToLocalStorage();
    syncLocalePreferenceToCookie();

    const pref = getLocalePreferenceClient();
    if (!pref) return;

    const defaultLoc = router.defaultLocale ?? "fr";

    if (pref === "en" && router.locale === defaultLoc && router.pathname === "/") {
      router.replace("/en");
      return;
    }

    if (pref === "fr" && router.locale === "en") {
      router.replace("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- avoid depending on whole `router` (unstable identity)
  }, [router.isReady, router.locale, router.pathname, router.defaultLocale]);

  return null;
}
