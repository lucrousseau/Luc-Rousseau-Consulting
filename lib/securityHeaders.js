/**
 * Shared security headers for next.config.mjs.
 * CSP allows self, Next inline scripts, GTM (when enabled), and Vercel Analytics / Speed Insights.
 */
const CSP_DIRECTIVES = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  [
    "script-src",
    "'self'",
    "'unsafe-inline'",
    "https://www.googletagmanager.com",
    "https://www.google-analytics.com",
    "https://va.vercel-scripts.com",
  ].join(" "),
  ["style-src", "'self'", "'unsafe-inline'"].join(" "),
  ["img-src", "'self'", "data:", "blob:", "https:"].join(" "),
  ["font-src", "'self'"].join(" "),
  [
    "connect-src",
    "'self'",
    "https://www.google-analytics.com",
    "https://analytics.google.com",
    "https://www.googletagmanager.com",
    "https://vitals.vercel-insights.com",
    "https://va.vercel-scripts.com",
  ].join(" "),
  ["frame-src", "'self'", "https://www.googletagmanager.com"].join(" "),
  "upgrade-insecure-requests",
];

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
