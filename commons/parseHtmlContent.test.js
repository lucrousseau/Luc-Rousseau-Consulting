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

  it("opens external http(s) links in a new tab", () => {
    const { container } = render(
      <>
        {parseHtmlContent(
          '<p>See <a href="https://milesopedia.com" rel="noopener noreferrer">Milesopedia</a>.</p>'
        )}
      </>
    );

    const link = container.querySelector("a");
    expect(link).toHaveAttribute("href", "https://milesopedia.com");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    expect(link).toHaveClass("text-link");
  });

  it("keeps relative links in the same tab", () => {
    const { container } = render(<>{parseHtmlContent('<a href="/situations">Situations</a>')}</>);
    expect(container.querySelector("a")).toHaveClass("text-link");

    const link = container.querySelector("a");
    expect(link).toHaveAttribute("href", "/situations");
    expect(link).not.toHaveAttribute("target");
  });
});

describe("parseHtmlItems", () => {
  it("returns an empty array when items is not an array", () => {
    expect(parseHtmlItems(null)).toEqual([]);
  });
});
