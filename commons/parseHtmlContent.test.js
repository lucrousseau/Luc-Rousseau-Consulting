import { render } from "@testing-library/react";

import { parseHtmlContent, parseHtmlItems } from "./parseHtmlContent";

describe("parseHtmlContent", () => {
  it("returns null for empty content", () => {
    expect(parseHtmlContent(null)).toBeNull();
  });

  it("parses HTML strings", () => {
    const { container } = render(<>{parseHtmlContent("<p>Hello</p>")}</>);

    expect(container.textContent).toBe("Hello");
  });
});

describe("parseHtmlItems", () => {
  it("returns an empty array when items is not an array", () => {
    expect(parseHtmlItems(null)).toEqual([]);
  });
});
