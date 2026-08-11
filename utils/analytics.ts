/**
 * Client-side Vercel Web Analytics helpers (custom events).
 * @see https://vercel.com/docs/analytics/custom-events
 *
 * Pro allows 2 custom properties per event (8 with Web Analytics Plus).
 * Prefer a stable `section` plus one human-readable detail (`item`, `label`,
 * `choice`, …). When a `page` id is provided, it is folded into `section`
 * (`section · page`) so the second slot stays free for that detail.
 */

export type AnalyticsPropertyValue = string | number | boolean | null | undefined;
export type AnalyticsProperties = Record<string, AnalyticsPropertyValue>;

/** Vercel rejects property values longer than 255 characters. */
const MAX_PROP_LENGTH = 255;

/** Collapse whitespace and truncate for Vercel Analytics property values. */
export function analyticsText(value: unknown): string | undefined {
  if (value == null) return undefined;
  const text = String(value).replace(/\s+/g, " ").trim();
  if (!text) return undefined;
  if (text.length <= MAX_PROP_LENGTH) return text;
  return `${text.slice(0, MAX_PROP_LENGTH - 1)}…`;
}

/** Join non-empty parts with a readable separator (en dash avoided on purpose). */
export function analyticsJoin(
  ...parts: Array<string | number | null | undefined>
): string | undefined {
  const cleaned = parts
    .map((part) => analyticsText(part))
    .filter((part): part is string => Boolean(part));
  if (!cleaned.length) return undefined;
  return analyticsText(cleaned.join(" · "));
}

function sanitizeProperties(properties?: AnalyticsProperties): AnalyticsProperties | undefined {
  if (!properties) return undefined;
  const next: AnalyticsProperties = {};
  for (const [key, value] of Object.entries(properties)) {
    if (value === undefined) continue;
    if (typeof value === "string") {
      const text = analyticsText(value);
      if (text === undefined) continue;
      next[key] = text;
      continue;
    }
    next[key] = value;
  }
  return next;
}

/**
 * Build event props: fold optional `page` into `section`, keep other details.
 * Example: `{ section: "situation-faq · premier-dev", item: "Délai ?" }`
 */
export function analyticsProps(section: string, detail?: AnalyticsProperties): AnalyticsProperties {
  const { page, ...rest } = detail ?? {};
  const sectionValue = analyticsJoin(section, page) ?? section;
  return sanitizeProperties({ section: sectionValue, ...rest }) ?? { section: sectionValue };
}

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
      track(name, sanitizeProperties(properties));
    }
  } catch {
    // Analytics unavailable (SSR, offline, or script blocked).
  }
}

/** Primary CTA / channel click (`cta_click`). */
export function trackCtaClick(section: string, properties?: AnalyticsProperties): void {
  trackEvent("cta_click", analyticsProps(section, properties));
}

/** Awaitable CTA click for tests. */
export async function trackCtaClickAsync(
  section: string,
  properties?: AnalyticsProperties
): Promise<void> {
  await trackEventAsync("cta_click", analyticsProps(section, properties));
}

/** Accordion expand (`accordion_open`) with a readable item title. */
export function trackAccordionOpen(
  section: string,
  itemTitle: string | undefined,
  properties?: AnalyticsProperties
): void {
  trackEvent(
    "accordion_open",
    analyticsProps(section, {
      item: analyticsText(itemTitle) ?? "(sans titre)",
      ...properties,
    })
  );
}
