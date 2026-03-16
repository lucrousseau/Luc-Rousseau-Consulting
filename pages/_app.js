import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

import { appWithTranslation } from "next-i18next";

import "../utils/fortawesome";
import "slick-carousel/slick/slick.css";
import "../styles/main.scss";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <SpeedInsights />
      <Analytics />
    </>
  );
}

export default appWithTranslation(MyApp);
