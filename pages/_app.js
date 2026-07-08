import dynamic from "next/dynamic";
import Script from "next/script";
import { useRouter } from "next/router";

import { appWithTranslation } from "next-i18next";

import { isCvPath } from "../commons/isCvPath";
import "../styles/main.scss";
import { GTM_CONTAINER_ID, isGtmEnabled } from "../utils/gtm";

const SpeedInsights = dynamic(
  () => import("@vercel/speed-insights/next").then((mod) => mod.SpeedInsights),
  { ssr: false }
);

const Analytics = dynamic(() => import("@vercel/analytics/react").then((mod) => mod.Analytics), {
  ssr: false,
});

function MyApp({ Component, pageProps }) {
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
          <Script id="google-tag-manager" strategy="lazyOnload">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_CONTAINER_ID}');`}
          </Script>
        </>
      ) : null}
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

export default appWithTranslation(MyApp);
