import { useEffect } from "react";

export const QUINCY_MEDIUM_STYLESHEET_ID = "quincy-medium-font";
export const QUINCY_MEDIUM_HREF = "/fonts/quincy-medium.css";
/** Load soon after first paint so below-fold h3s get Medium without competing with LCP. */
export const QUINCY_MEDIUM_IDLE_TIMEOUT_MS = 2000;

export function injectQuincyMediumStylesheet(): void {
  if (typeof document === "undefined") return;
  if (document.getElementById(QUINCY_MEDIUM_STYLESHEET_ID)) return;

  const link = document.createElement("link");
  link.id = QUINCY_MEDIUM_STYLESHEET_ID;
  link.rel = "stylesheet";
  link.href = QUINCY_MEDIUM_HREF;
  document.head.appendChild(link);
}

/**
 * Loads Quincy Medium after idle so @font-face 500 is not in the render-blocking CSS.
 */
export default function DeferredMediumFont() {
  useEffect(() => {
    const idle = window.requestIdleCallback;
    if (typeof idle === "function") {
      const idleId = idle(injectQuincyMediumStylesheet, { timeout: QUINCY_MEDIUM_IDLE_TIMEOUT_MS });
      return () => window.cancelIdleCallback(idleId);
    }

    const timeoutId = window.setTimeout(
      injectQuincyMediumStylesheet,
      QUINCY_MEDIUM_IDLE_TIMEOUT_MS
    );
    return () => window.clearTimeout(timeoutId);
  }, []);

  return null;
}
