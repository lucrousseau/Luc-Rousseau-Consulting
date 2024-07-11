/** @type {import('next').NextConfig} */

import i18n from "./next-i18next.config.js";

const withBundleAnalyzer = (await import("@next/bundle-analyzer")).default({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  ...i18n,
  reactStrictMode: true,
};

export default withBundleAnalyzer(nextConfig);
