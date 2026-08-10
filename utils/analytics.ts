/**
 * Client-side Vercel Web Analytics helpers (custom events).
 * @see https://vercel.com/docs/analytics/custom-events
 */

export type AnalyticsPropertyValue = string | number | boolean | null | undefined;
export type AnalyticsProperties = Record<string, AnalyticsPropertyValue>;

/** Fire a custom analytics event. Safe no-op if the script is unavailable. */
export function trackEvent(name: string, properties?: AnalyticsProperties): void {
  void trackEventAsync(name, properties);
}

/** Awaitable variant used by tests and rare sync-sensitive call sites. */
export async function trackEventAsync(
  name: string,
  properties?: AnalyticsProperties
): Promise<void> {
  try {
    const { track } = await import("@vercel/analytics");
    if (typeof track === "function") {
      track(name, properties);
    }
  } catch {
    // Analytics unavailable (SSR, offline, or script blocked).
  }
}

/** Primary CTA / channel click (`cta_click`). */
export function trackCtaClick(section: string, properties?: AnalyticsProperties): void {
  trackEvent("cta_click", { section, ...properties });
}

/** Awaitable CTA click for tests. */
export async function trackCtaClickAsync(
  section: string,
  properties?: AnalyticsProperties
): Promise<void> {
  await trackEventAsync("cta_click", { section, ...properties });
}
