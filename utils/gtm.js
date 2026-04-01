/**
 * Google Tag Manager container ID (public, not a secret).
 * Override with NEXT_PUBLIC_GTM_ID in .env / Vercel.
 * Set NEXT_PUBLIC_GTM_ID="" to disable GTM (requires rebuild).
 */
export const GTM_CONTAINER_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-NR63CJ";

export const isGtmEnabled = () => Boolean(GTM_CONTAINER_ID);
