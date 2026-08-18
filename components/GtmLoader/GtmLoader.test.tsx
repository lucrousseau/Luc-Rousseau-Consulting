import { render } from "@testing-library/react";

import GtmLoader, { GTM_IDLE_TIMEOUT_MS, GTM_SCRIPT_ID, injectGtm } from "./index";

function gtmScript() {
  return document.getElementById(GTM_SCRIPT_ID) as HTMLScriptElement | null;
}

describe("GtmLoader", () => {
  beforeEach(() => {
    gtmScript()?.remove();
    delete window.dataLayer;
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    gtmScript()?.remove();
  });

  it("does not inject GTM on mount", () => {
    render(<GtmLoader />);
    expect(gtmScript()).toBeNull();
  });

  it("injects GTM on the first pointerdown", () => {
    render(<GtmLoader />);
    window.dispatchEvent(new Event("pointerdown"));

    const script = gtmScript();
    expect(script).not.toBeNull();
    expect(script?.src).toContain("googletagmanager.com/gtm.js?id=GTM-NR63CJ");
    expect(script?.async).toBe(true);
  });

  it("injects GTM after the idle timeout when there is no interaction", () => {
    render(<GtmLoader />);
    jest.advanceTimersByTime(GTM_IDLE_TIMEOUT_MS);
    expect(gtmScript()).not.toBeNull();
  });

  it("injects only once", () => {
    injectGtm();
    injectGtm();
    expect(document.querySelectorAll(`#${GTM_SCRIPT_ID}`)).toHaveLength(1);
  });
});
