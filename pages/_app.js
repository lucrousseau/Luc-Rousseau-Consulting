import "../utils/fortawesome";

import "../styles/main.scss";

import { SpeedInsights } from "@vercel/speed-insights/next";

import { appWithTranslation } from "next-i18next";

function MyApp({ Component, pageProps }) {
  <SpeedInsights />;
  return <Component {...pageProps} />;
}

export default appWithTranslation(MyApp);
