/**
 * Shared security headers for next.config.mjs.
 * CSP allows self, Next inline scripts, GTM (when enabled), and Vercel Analytics / Speed Insights.
 *
 * In development, Next.js Fast Refresh uses `eval()` and a websocket on the dev origin;
 * we relax `script-src` and `connect-src` accordingly. Production headers stay strict.
 */
const isDev = process.env.NODE_ENV !== "production";

const scriptSrc = [
  "script-src",
  "'self'",
  "'unsafe-inline'",
  isDev ? "'unsafe-eval'" : null,
  "https://www.googletagmanager.com",
  "https://www.google-analytics.com",
  "https://va.vercel-scripts.com",
].filter(Boolean);

const connectSrc = [
  "connect-src",
  "'self'",
  isDev ? "ws:" : null,
  isDev ? "wss:" : null,
  "https://www.google-analytics.com",
  "https://analytics.google.com",
  "https://www.googletagmanager.com",
  "https://vitals.vercel-insights.com",
  "https://va.vercel-scripts.com",
].filter(Boolean);

const CSP_DIRECTIVES = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  scriptSrc.join(" "),
  ["style-src", "'self'", "'unsafe-inline'"].join(" "),
  ["img-src", "'self'", "data:", "blob:", "https:"].join(" "),
  ["font-src", "'self'"].join(" "),
  connectSrc.join(" "),
  // Site manifest may be served from the canonical absolute origin (see components/SEO).
  ["manifest-src", "'self'", "https:"].join(" "),
  ["frame-src", "'self'", "https://www.googletagmanager.com"].join(" "),
  isDev ? null : "upgrade-insecure-requests",
].filter(Boolean);

const CONTENT_SECURITY_POLICY = CSP_DIRECTIVES.join("; ");

/** @type {{ key: string; value: string }[]} */
export const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
  },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Content-Security-Policy",
    value: CONTENT_SECURITY_POLICY,
  },
];
