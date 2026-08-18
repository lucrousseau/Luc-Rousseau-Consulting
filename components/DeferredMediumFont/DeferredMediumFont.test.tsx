import { render } from "@testing-library/react";

import DeferredMediumFont, {
  QUINCY_MEDIUM_HREF,
  QUINCY_MEDIUM_IDLE_TIMEOUT_MS,
  QUINCY_MEDIUM_STYLESHEET_ID,
  injectQuincyMediumStylesheet,
} from "./index";

function mediumStylesheet() {
  return document.getElementById(QUINCY_MEDIUM_STYLESHEET_ID) as HTMLLinkElement | null;
}

describe("DeferredMediumFont", () => {
  beforeEach(() => {
    mediumStylesheet()?.remove();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    mediumStylesheet()?.remove();
  });

  it("does not inject the Medium face on mount", () => {
    render(<DeferredMediumFont />);
    expect(mediumStylesheet()).toBeNull();
  });

  it("injects the Medium stylesheet after idle", () => {
    render(<DeferredMediumFont />);
    jest.advanceTimersByTime(QUINCY_MEDIUM_IDLE_TIMEOUT_MS);

    const link = mediumStylesheet();
    expect(link).not.toBeNull();
    expect(link?.rel).toBe("stylesheet");
    expect(link?.href).toContain(QUINCY_MEDIUM_HREF);
  });

  it("injects only once", () => {
    injectQuincyMediumStylesheet();
    injectQuincyMediumStylesheet();
    expect(document.querySelectorAll(`#${QUINCY_MEDIUM_STYLESHEET_ID}`)).toHaveLength(1);
  });
});
