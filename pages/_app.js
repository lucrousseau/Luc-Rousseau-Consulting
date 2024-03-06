import "../utils/fortawesome";

import "../styles/main.scss";

import { SpeedInsights } from "@vercel/speed-insights/next";

import { appWithTranslation } from "next-i18next";

function MyApp({ Component, pageProps }) {
  <SpeedInsights />;
  return <Component {...pageProps} />;
}

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

export default appWithTranslation(MyApp);
