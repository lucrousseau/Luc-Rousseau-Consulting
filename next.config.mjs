/** @type {import('next').NextConfig} */

import path from "path";
import { fileURLToPath } from "url";
import i18n from "./next-i18next.config.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const withBundleAnalyzer = (await import("@next/bundle-analyzer")).default({
  enabled: process.env.ANALYZE === "true",
});

const nextPolyfillModule = path.join(
  __dirname,
  "node_modules/next/dist/build/polyfills/polyfill-module.js"
);

const nextConfig = {
  outputFileTracingRoot: __dirname,
  serverExternalPackages: ["image-size"],
  webpack(config) {
    // Next bundles baseline polyfills into `main` for all browsers; we target modern only.
    config.resolve.alias = {
      ...config.resolve.alias,
      [nextPolyfillModule]: path.join(__dirname, "lib/empty-polyfill.js"),
    };
    return config;
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [384, 640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
  },
  experimental: {
    // classnames breaks dev HMR when optimized (import.meta.webpackHot in CJS context)
    optimizePackageImports: ["html-react-parser"],
  },
  async rewrites() {
    return [
      { source: "/sitemap.xml", destination: "/api/sitemap" },
      { source: "/robots.txt", destination: "/api/robots" },
      { source: "/llms.txt", destination: "/api/llms.txt" },
    ];
  },
  i18n: {
    defaultLocale: i18n.i18n.defaultLocale,
    locales: i18n.i18n.locales,
    localeDetection: i18n.i18n.localeDetection,
  },
  reactStrictMode: true,
  async headers() {
    const cacheableHtml = "public, s-maxage=86400, stale-while-revalidate=604800";

    return [
      {
        source: "/",
        headers: [{ key: "Cache-Control", value: cacheableHtml }],
      },
      {
        source: "/en",
        headers: [{ key: "Cache-Control", value: cacheableHtml }],
      },
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
    /** www → apex is handled in vercel.json (edge), not here — avoids i18n redirect loops. */
    const rules = [];

    const zinesBase = "https://lucrousseau.ca/zines";
    const zineMappings = [
      { from: "05_gre_esp_fra", to: "05-gre-esp-fra" },
      { from: "04_cai", to: "04-cai" },
      { from: "03_ist", to: "03-ist" },
      { from: "02_prt_hun_ita", to: "02-prt-hun-ita" },
      { from: "01_mex", to: "01-mex" },
    ];

    /** Index redirects: /zines, /fr/zines, /en/zines → external zines site */
    for (const base of ["/zines", "/fr/zines", "/en/zines"]) {
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
      for (const prefix of ["/zines", "/fr/zines", "/en/zines"]) {
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
