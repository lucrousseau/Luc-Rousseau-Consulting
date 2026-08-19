import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import { appWithTranslation } from "next-i18next/pages";

import { isCvPath } from "../commons/isCvPath";
import { nextI18NextConfig } from "../commons/nextI18NextConfig";
import DeferredMediumFont from "../components/DeferredMediumFont";
import "../styles/main.scss";

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
