import { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import { getLocalePreferenceClient } from "../utils/setLocalePreferenceClient";

/**
 * Unknown routes redirect to the localized home (default: `/`, English: `/en`).
 * Uses the same preference as the rest of the app: **localStorage** first, then cookie.
 * Zines paths are handled by `next.config.mjs` redirects and never reach this page.
 */
export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    const defaultLocale = router.defaultLocale ?? "fr";
    const pref = getLocalePreferenceClient();

    let homePath = "/";
    if (pref === "en") {
      homePath = "/en";
    } else if (pref === "fr") {
      homePath = "/";
    } else {
      homePath = router.locale === defaultLocale ? "/" : "/en";
    }

    router.replace(homePath);
  }, [router]);

  return (
    <>
      <Head>
        <title>404</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
    </>
  );
}
