/** @type {import('next').NextConfig} */

import i18n from "./next-i18next.config.js";

const withBundleAnalyzer = (await import("@next/bundle-analyzer")).default({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  i18n: {
    defaultLocale: i18n.i18n.defaultLocale,
    locales: i18n.i18n.locales,
    localeDetection: i18n.i18n.localeDetection,
  },
  reactStrictMode: true,
  async redirects() {
    const hostCom = [{ type: "host", value: "lucrousseau.com" }];
    const zineMappings = [
      { from: "05_gre_esp_fra", to: "05-gre-esp-fra" },
      { from: "04_cai", to: "04-cai" },
      { from: "03_ist", to: "03-ist" },
      { from: "02_prt_hun_ita", to: "02-prt-hun-ita" },
      { from: "01_mex", to: "01-mex" },
    ];

    /** Start with the index redirect (handles optional fr/ and trailing slash) */
    const rules = [
      {
        source: "/(fr/)?zines/?",
        has: hostCom,
        destination: "https://lucrousseau.ca/zines/",
        permanent: true,
      },
    ];

    /** Add one rule per zine (handles optional fr/ and trailing slash) */
    for (const { from, to } of zineMappings) {
      rules.push({
        source: `/(fr/)?zines/${from}/?`,
        has: hostCom,
        destination: `https://lucrousseau.ca/zines/${to}`,
        permanent: true,
      });
    }

    return rules;
  },
};

export default withBundleAnalyzer(nextConfig);

