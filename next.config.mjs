/** @type {import('next').NextConfig} */

import path from "path";
import { fileURLToPath } from "url";
import i18n from "./next-i18next.config.js";
import { securityHeaders } from "./lib/securityHeaders.mjs";
import { SITUATION_SLUG_PAIRS as SITUATIONS } from "./commons/situationSlugRoutes.mjs";

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
  // next-i18next loads config + locale JSON via fs at runtime (ISR revalidate).
  // Vercel NFT does not always trace those paths; force them into /var/task.
  outputFileTracingIncludes: {
    "/*": ["./next-i18next.config.js", "./public/locales/**/*"],
  },
  serverExternalPackages: ["image-size"],
  turbopack: {
    resolveAlias: {
      [nextPolyfillModule]: path.join(__dirname, "lib/empty-polyfill.js"),
    },
  },
  webpack(config) {
    // Fallback for `next build --webpack` when Turbopack alias is unavailable.
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
    qualities: [75, 85],
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
      { source: "/llms-full.txt", destination: "/api/llms-full.txt" },
      { source: "/humans.txt", destination: "/api/humans.txt" },
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
    const homeHeaders = [{ key: "Cache-Control", value: cacheableHtml }, ...securityHeaders];

    return [
      { source: "/", headers: homeHeaders },
      { source: "/en", headers: homeHeaders },
      { source: "/(.*)", headers: securityHeaders },
    ];
  },
  async redirects() {
    /** www → apex is handled in vercel.json (edge), not here; avoids i18n redirect loops. */
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

    /** Legacy /guides URLs → /situations (301 for SEO). locale: false = match path literally (i18n-safe). */
    const situationRedirects = [
      { source: "/guides", destination: "/situations", permanent: true, locale: false },
      { source: "/guides/", destination: "/situations", permanent: true, locale: false },
      { source: "/en/guides", destination: "/en/situations", permanent: true, locale: false },
      { source: "/en/guides/", destination: "/en/situations", permanent: true, locale: false },
    ];

    for (const situation of SITUATIONS) {
      situationRedirects.push(
        {
          source: `/guides/${situation.slugFr}`,
          destination: `/situations/${situation.slugFr}`,
          permanent: true,
          locale: false,
        },
        {
          source: `/guides/${situation.slugFr}/`,
          destination: `/situations/${situation.slugFr}`,
          permanent: true,
          locale: false,
        },
        {
          source: `/en/guides/${situation.slugEn}`,
          destination: `/en/situations/${situation.slugEn}`,
          permanent: true,
          locale: false,
        },
        {
          source: `/en/guides/${situation.slugEn}/`,
          destination: `/en/situations/${situation.slugEn}`,
          permanent: true,
          locale: false,
        }
      );
    }

    return [...rules, ...situationRedirects];
  },
};

export default withBundleAnalyzer(nextConfig);
