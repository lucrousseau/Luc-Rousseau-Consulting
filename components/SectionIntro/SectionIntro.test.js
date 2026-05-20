import { render, screen } from "@testing-library/react";

import SectionIntro from "./index";

describe("SectionIntro", () => {
  it("renders badge and title", () => {
    render(<SectionIntro badge="Badge" title="Section title" />);

    expect(screen.getByText("Badge")).toHaveClass("section__badge");
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Section title");
  });

  it("renders lede and children", () => {
    render(
      <SectionIntro title="Title" lede={<p>Summary lede</p>}>
        <p>Extra child</p>
      </SectionIntro>
    );

    expect(screen.getByText("Summary lede")).toBeInTheDocument();
    expect(screen.getByText("Extra child")).toBeInTheDocument();
  });

  it("omits badge when empty", () => {
    render(<SectionIntro badge="" title="Only title" />);

    expect(document.querySelector(".section__badge")).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
  });

  it("renders h1 when titleAs is h1", () => {
    render(<SectionIntro title="Page title" titleAs="h1" />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Page title");
  });
});
