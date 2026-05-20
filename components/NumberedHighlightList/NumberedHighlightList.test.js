import { render, screen } from "@testing-library/react";

import NumberedHighlightList from "./index";

describe("NumberedHighlightList", () => {
  it("returns null when items is empty", () => {
    const { container } = render(<NumberedHighlightList items={[]} />);

    expect(container.firstChild).toBeNull();
  });

  it("renders numbered items with HTML content", () => {
    render(
      <NumberedHighlightList
        items={[
          { title: "First point", content: "<p>First body</p>" },
          { title: "Second point", content: "<p>Second body</p>" },
        ]}
      />
    );

    expect(screen.getByRole("heading", { level: 3, name: "First point" })).toBeInTheDocument();
    expect(screen.getByText("First body")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(document.querySelector(".component__numbered-highlight-list")).toBeInTheDocument();
  });
});
