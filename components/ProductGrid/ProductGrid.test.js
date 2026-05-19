import { render, screen } from "@testing-library/react";

import ProductGrid from "./index";

describe("ProductGrid", () => {
  it("returns null when items is empty", () => {
    const { container } = render(<ProductGrid items={[]} renderItem={() => <p>Content</p>} />);

    expect(container.firstChild).toBeNull();
  });

  it("renders a single product card", () => {
    render(<ProductGrid items={[{ title: "Card title" }]} renderItem={() => <p>Card body</p>} />);

    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent("Card title");
    expect(screen.getByText("Card body")).toBeInTheDocument();
  });
});
