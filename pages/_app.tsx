import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import { appWithTranslation } from "next-i18next/pages";

import { isCvPath } from "../commons/isCvPath";
import { nextI18NextConfig } from "../commons/nextI18NextConfig";
import DeferredMediumFont from "../components/DeferredMediumFont";
import GtmLoader from "../components/GtmLoader";
import "../styles/main.scss";
import { GTM_CONTAINER_ID, isGtmEnabled } from "../utils/gtm";

const SpeedInsights = dynamic(
  () => import("@vercel/speed-insights/next").then((mod) => mod.SpeedInsights),
  { ssr: false }
);

const Analytics = dynamic(() => import("@vercel/analytics/react").then((mod) => mod.Analytics), {
  ssr: false,
});

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isCvPage = isCvPath(router.pathname);

  return (
    <>
      {isGtmEnabled() && !isCvPage ? (
        <>
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_CONTAINER_ID}`}
              height="0"
              width="0"
              title="Google Tag Manager"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
          <GtmLoader />
        </>
      ) : null}
      <DeferredMediumFont />
      <Component {...pageProps} />
      {!isCvPage ? (
        <>
          <SpeedInsights />
          <Analytics />
        </>
      ) : null}
    </>
  );
}

export default appWithTranslation(MyApp, nextI18NextConfig);
