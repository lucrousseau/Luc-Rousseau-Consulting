import { render, screen } from "@testing-library/react";

import SocialLinks from "./index";

jest.mock("next-i18next/pages", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const values: Record<string, string> = {
        linkedin: "https://www.linkedin.com/in/lucrousseau/",
        "linkedin-contact-label": "LinkedIn",
        github: "https://github.com/lucrousseau/",
        "github-contact-label": "GitHub",
      };
      return values[key] ?? key;
    },
    i18n: { language: "fr" },
  }),
}));

describe("SocialLinks", () => {
  it("renders LinkedIn and GitHub links to the public profiles", () => {
    render(<SocialLinks />);

    const linkedIn = screen.getByRole("link", { name: "LinkedIn" });
    expect(linkedIn).toHaveAttribute("href", "https://www.linkedin.com/in/lucrousseau/");
    expect(linkedIn).toHaveAttribute("target", "_blank");

    const github = screen.getByRole("link", { name: "GitHub" });
    expect(github).toHaveAttribute("href", "https://github.com/lucrousseau/");
    expect(github).toHaveAttribute("rel", "noopener noreferrer");
  });
});
