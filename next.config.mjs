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
      { source: "/.well-known/ai.txt", destination: "/api/ai.txt" },
      { source: "/ai.txt", destination: "/api/ai.txt" },
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
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
          },
          { key: "X-DNS-Prefetch-Control", value: "on" },
        ],
      },
    ];
  },
  async redirects() {
    const zinesBase = "https://lucrousseau.ca/zines";
    const zineMappings = [
      { from: "05_gre_esp_fra", to: "05-gre-esp-fra" },
      { from: "04_cai", to: "04-cai" },
      { from: "03_ist", to: "03-ist" },
      { from: "02_prt_hun_ita", to: "02-prt-hun-ita" },
      { from: "01_mex", to: "01-mex" },
    ];

    /** Index redirects: /zines and /fr/zines → external zines site */
    const rules = [];
    for (const base of ["/zines", "/fr/zines"]) {
      rules.push({
        source: base,
        destination: `${zinesBase}/`,
        permanent: true,
      });
      rules.push({
        source: `${base}/`,
        destination: `${zinesBase}/`,
        permanent: true,
      });
    }

    /** Per-zine redirects: slug variants with underscore or trailing slash */
    for (const { from, to } of zineMappings) {
      for (const prefix of ["/zines", "/fr/zines"]) {
        rules.push({
          source: `${prefix}/${from}`,
          destination: `${zinesBase}/${to}`,
          permanent: true,
        });
        rules.push({
          source: `${prefix}/${from}/`,
          destination: `${zinesBase}/${to}`,
          permanent: true,
        });
      }
    }

    return rules;
  },
};

export default withBundleAnalyzer(nextConfig);
