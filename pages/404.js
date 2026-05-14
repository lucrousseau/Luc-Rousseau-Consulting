import { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import { localeFromDocumentCookie } from "../utils/localePreference";

/**
 * Unknown routes redirect to the localized home (default: `/`, English: `/en`).
 * Honors `lrc-locale` cookie when set via the language switcher.
 * Zines paths are handled by `next.config.mjs` redirects and never reach this page.
 */
export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    const defaultLocale = router.defaultLocale ?? "fr";
    const fromCookie =
      typeof document !== "undefined" ? localeFromDocumentCookie(document.cookie) : null;

    let homePath = "/";
    if (fromCookie === "en") {
      homePath = "/en";
    } else if (fromCookie === "fr") {
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
