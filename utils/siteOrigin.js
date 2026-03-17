/**
 * Returns the site origin (e.g. https://lucrousseau.com) for SEO, sitemap, robots.
 * - In the browser: uses window.location.origin (always correct).
 * - In API routes: pass req to use Host + X-Forwarded-Proto (works behind proxies).
 * - Otherwise: falls back to NEXT_PUBLIC_DOMAIN from .env.
 *
 * Set NEXT_PUBLIC_DOMAIN in .env.local for SSR and when no request is available.
 */

const FALLBACK_ORIGIN = "https://lucrousseau.com";

/**
 * @param {import('http').IncomingMessage} [req] - Request object (API route handler). Omit in components.
 * @returns {string} Origin without trailing slash (e.g. https://lucrousseau.com)
 */
export function getSiteOrigin(req = null) {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  if (req?.headers?.host) {
    const proto = req.headers["x-forwarded-proto"] || "https";
    return `${proto}://${req.headers.host}`.replace(/\/$/, "");
  }
  return (process.env.NEXT_PUBLIC_DOMAIN || FALLBACK_ORIGIN).replace(/\/$/, "");
}
