import { useEffect } from "react";

import { GTM_CONTAINER_ID, isGtmEnabled } from "../../utils/gtm";

export const GTM_SCRIPT_ID = "gtm-script";
export const GTM_IDLE_TIMEOUT_MS = 15000;

const INTERACTION_EVENTS = ["pointerdown", "keydown", "scroll", "touchstart"] as const;

type DataLayerEvent = Record<string, unknown>;

declare global {
  interface Window {
    dataLayer?: DataLayerEvent[];
  }
}

export function injectGtm(): void {
  if (typeof document === "undefined" || !isGtmEnabled()) return;
  if (document.getElementById(GTM_SCRIPT_ID)) return;

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({
    "gtm.start": Date.now(),
    event: "gtm.js",
  });

  const script = document.createElement("script");
  script.id = GTM_SCRIPT_ID;
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_CONTAINER_ID}`;
  document.head.appendChild(script);
}

/**
 * Loads GTM on first interaction, or after 15s idle, so a Lighthouse lab run
 * does not download gtag/gtm.js.
 */
export default function GtmLoader() {
  useEffect(() => {
    if (!isGtmEnabled()) return;

    const onInteraction = () => {
      injectGtm();
    };

    for (const eventName of INTERACTION_EVENTS) {
      window.addEventListener(eventName, onInteraction, { once: true, passive: true });
    }

    const idle = window.requestIdleCallback;
    if (typeof idle === "function") {
      const idleId = idle(injectGtm, { timeout: GTM_IDLE_TIMEOUT_MS });
      return () => {
        for (const eventName of INTERACTION_EVENTS) {
          window.removeEventListener(eventName, onInteraction);
        }
        window.cancelIdleCallback(idleId);
      };
    }

    const timeoutId = window.setTimeout(injectGtm, GTM_IDLE_TIMEOUT_MS);
    return () => {
      for (const eventName of INTERACTION_EVENTS) {
        window.removeEventListener(eventName, onInteraction);
      }
      window.clearTimeout(timeoutId);
    };
  }, []);

  return null;
}
