/** @jest-environment node */

import { negotiateMediaType, parseAcceptHeader, prefersMarkdown } from "./acceptHeader";

describe("acceptHeader", () => {
  it("ranks text/markdown ahead of text/html when requested", () => {
    expect(prefersMarkdown("text/markdown")).toBe(true);
    expect(prefersMarkdown("text/markdown, text/html;q=0.8")).toBe(true);
  });

  it("keeps HTML for browser Accept headers", () => {
    expect(prefersMarkdown("text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8")).toBe(
      false
    );
  });

  it("parses q-values and specificity", () => {
    const parsed = parseAcceptHeader("text/*, text/markdown;q=0.5, text/html");
    expect(parsed[0].type).toBe("text/html");
    expect(
      negotiateMediaType("text/markdown, text/html;q=0.1", ["text/html", "text/markdown"])
    ).toBe("text/markdown");
  });

  it("returns null when every available type is refused", () => {
    expect(negotiateMediaType("text/markdown;q=0", ["text/markdown"])).toBeNull();
  });
});
