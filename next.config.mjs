/** @type {import('next').NextConfig} */

import path from "path";
import { fileURLToPath } from "url";
import i18n from "./next-i18next.config.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const withBundleAnalyzer = (await import("@next/bundle-analyzer")).default({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  outputFileTracingRoot: __dirname,
  serverExternalPackages: ["image-size"],
  async rewrites() {
    return [
      { source: "/sitemap.xml", destination: "/api/sitemap" },
      { source: "/robots.txt", destination: "/api/robots" },
    ];
  },
  i18n: {
    defaultLocale: i18n.i18n.defaultLocale,
    locales: i18n.i18n.locales,
    localeDetection: i18n.i18n.localeDetection,
  },
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },
  async redirects() {
    const hostCom = [{ type: "host", value: "lucrousseau.com" }];
    const zineMappings = [
      { from: "05_gre_esp_fra", to: "05-gre-esp-fra" },
      { from: "04_cai", to: "04-cai" },
      { from: "03_ist", to: "03-ist" },
      { from: "02_prt_hun_ita", to: "02-prt-hun-ita" },
      { from: "01_mex", to: "01-mex" },
    ];

    /** Index redirects: explicit variants (no optional tokens allowed) */
    const rules = [];
    for (const base of ["/zines", "/fr/zines"]) {
      rules.push({
        source: base,
        has: hostCom,
        destination: "https://lucrousseau.com/zines/",
        permanent: true,
      });
      rules.push({
        source: `${base}/`,
        has: hostCom,
        destination: "https://lucrousseau.com/zines/",
        permanent: true,
      });
    }

    /** Per-zine redirects: explicit fr/ and trailing-slash variants */
    for (const { from, to } of zineMappings) {
      for (const prefix of ["/zines", "/fr/zines"]) {
        rules.push({
          source: `${prefix}/${from}`,
          has: hostCom,
          destination: `https://lucrousseau.com/zines/${to}`,
          permanent: true,
        });
        rules.push({
          source: `${prefix}/${from}/`,
          has: hostCom,
          destination: `https://lucrousseau.com/zines/${to}`,
          permanent: true,
        });
      }
    }

    return rules;
  },
};

export default withBundleAnalyzer(nextConfig);
