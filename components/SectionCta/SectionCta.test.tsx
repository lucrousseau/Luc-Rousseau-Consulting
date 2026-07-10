import { render, screen } from "@testing-library/react";

import SectionCta from "./index";

jest.mock("next-i18next", () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

describe("SectionCta", () => {
  it("renders schedule link and label", () => {
    render(
      <SectionCta
        trackSection="test-section"
        href="https://calendly.com/example"
        label="Book a call"
      />
    );

    const link = screen.getByRole("link", { name: "Book a call" });
    expect(link).toHaveAttribute("href", "https://calendly.com/example");
  });

  it("renders contact alternates by default", () => {
    render(
      <SectionCta trackSection="faq" href="https://calendly.com/example" label="Book a call" />
    );

    expect(screen.getByText("linkedin-contact-label")).toBeInTheDocument();
    expect(screen.getByText("contact-email-display")).toBeInTheDocument();
  });

  it("hides contact alternates when showContactAlternates is false", () => {
    render(
      <SectionCta
        trackSection="faq"
        href="https://calendly.com/example"
        label="Book a call"
        showContactAlternates={false}
      />
    );

    expect(screen.queryByText("linkedin-contact-label")).not.toBeInTheDocument();
  });

  it("renders string teaser with className", () => {
    render(
      <SectionCta
        trackSection="test"
        href="https://calendly.com/example"
        label="CTA"
        teaser="Teaser text"
        teaserClassName="cta-teaser"
      />
    );

    const teaser = screen.getByText("Teaser text");
    expect(teaser).toHaveClass("cta-teaser");
  });
});
