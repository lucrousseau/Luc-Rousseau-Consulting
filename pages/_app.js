import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";

import { appWithTranslation } from "next-i18next";

import "../styles/main.scss";
import { GTM_CONTAINER_ID, isGtmEnabled } from "../utils/gtm";

function MyApp({ Component, pageProps }) {
  return (
    <>
      {isGtmEnabled() ? (
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_CONTAINER_ID}');`}
        </Script>
      ) : null}
      <Component {...pageProps} />
      <SpeedInsights />
      <Analytics />
    </>
  );
}

export default appWithTranslation(MyApp);
