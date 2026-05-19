import { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

/**
 * Unknown routes redirect to the localized home: `/en` if the current URL is the
 * English locale, `/` otherwise. Zines paths are handled by `next.config.mjs`
 * redirects and never reach this page.
 */
export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    const homePath = router.locale === "en" ? "/en" : "/";
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
