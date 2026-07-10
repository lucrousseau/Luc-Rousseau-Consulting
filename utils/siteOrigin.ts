/**
 * Returns the site origin (e.g. https://lucrousseau.com) for SEO, sitemap, robots.
 * - In the browser: uses window.location.origin (always correct).
 * - In API routes: pass req; Host must match an allowlist (mitigates Host-header abuse).
 * - Otherwise: falls back to NEXT_PUBLIC_DOMAIN from .env.
 *
 * Set NEXT_PUBLIC_DOMAIN in .env.local for SSR and when no request is available.
 * Optional NEXT_PUBLIC_TRUSTED_HOSTS: comma-separated extra hostnames (e.g. preview domains).
 */

import type { IncomingMessage } from "http";

const FALLBACK_ORIGIN = "https://lucrousseau.com";

function hostnameFromOriginLike(urlLike: string | undefined): string | null {
  if (!urlLike) return null;
  const trimmed = urlLike.replace(/\/+$/, "");
  try {
    const withScheme = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
    return new URL(withScheme).hostname.toLowerCase();
  } catch {
    return null;
  }
}

function trustedHostnameSet(): Set<string> {
  const set = new Set(["localhost", "127.0.0.1"]);

  const fromEnv = hostnameFromOriginLike(process.env.NEXT_PUBLIC_DOMAIN);
  const fromFallback = hostnameFromOriginLike(FALLBACK_ORIGIN);

  for (const h of [fromEnv, fromFallback]) {
    if (!h) continue;
    set.add(h);
    if (!h.startsWith("www.")) {
      set.add(`www.${h}`);
    }
  }

  const extra = process.env.NEXT_PUBLIC_TRUSTED_HOSTS;
  if (extra) {
    for (const part of extra.split(",")) {
      const h = part.trim().toLowerCase().replace(/\/+$/, "");
      if (h) set.add(h);
    }
  }

  return set;
}

function hostnameOnly(hostHeader: string | undefined): string {
  if (!hostHeader) return "";
  return hostHeader.split(":")[0].replace(/\/+$/, "").toLowerCase();
}

/** Canonical hostname for SEO URLs (apex only; www is redirected at the edge). */
function canonicalHostname(hostname: string): string {
  return hostname.startsWith("www.") ? hostname.slice(4) : hostname;
}

export function getSiteOrigin(req: IncomingMessage | null = null): string {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  if (req?.headers?.host) {
    const hostHeader = String(req.headers.host).replace(/\/+$/, "");
    const hostname = hostnameOnly(hostHeader);
    const trusted = trustedHostnameSet();

    if (!trusted.has(hostname)) {
      return (process.env.NEXT_PUBLIC_DOMAIN || FALLBACK_ORIGIN).replace(/\/$/, "");
    }

    const rawProto = req.headers["x-forwarded-proto"];
    const proto = (Array.isArray(rawProto) ? rawProto[0] : String(rawProto || "https"))
      .split(",")[0]
      .trim();
    const port = hostHeader.includes(":") ? `:${hostHeader.split(":")[1]}` : "";
    const hostForOrigin = `${canonicalHostname(hostname)}${port}`;
    return `${proto}://${hostForOrigin}`.replace(/\/$/, "");
  }

  return (process.env.NEXT_PUBLIC_DOMAIN || FALLBACK_ORIGIN).replace(/\/$/, "");
}
