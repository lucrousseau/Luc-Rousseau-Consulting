import { readFileSync } from "fs";
import { join } from "path";
import { fireEvent, render, screen, within } from "@testing-library/react";

import Tangible from "./index";

const fr = JSON.parse(
  readFileSync(join(process.cwd(), "public", "locales", "fr", "tangible.json"), "utf8")
);

jest.mock("next-i18next/pages", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      if (key === "tangible:items") return fr.items;
      const [, field] = key.split(":");
      return (field && typeof fr[field] === "string" ? fr[field] : "") as string;
    },
    i18n: { language: "fr" },
  }),
}));

// next/jest stubs every static image to the same src: give each logo its own to tell them apart.
jest.mock("./logos", () => ({
  PROJECT_LOGOS: {
    "builder-helper": "/builder-helper.svg",
    milesopedia: "/milesopedia.png",
    nesto: "/nesto.png",
    "mon-meilleur-taux": "/comparemortgage.png",
    brightwize: "/nestogroup.png",
  },
}));

jest.mock("../../utils/analytics", () => ({
  trackAccordionOpen: jest.fn(),
  trackCtaClick: jest.fn(),
}));

const rowFor = (title: string) => {
  const trigger = screen
    .getAllByRole("button")
    .find((button) => button.textContent?.trim().startsWith(title));
  return trigger?.closest(".component__accordion__item") as HTMLElement;
};

describe("Tangible section", () => {
  it("renders Builder Helper first, with its badge, and keeps each logo on its own case", () => {
    render(<Tangible showCta={false} />);

    const triggers = screen.getAllByRole("button", { expanded: false });
    expect(triggers[0]).toHaveTextContent("Builder Helper");

    expect(within(rowFor("Builder Helper")).getByRole("img")).toHaveAttribute(
      "src",
      expect.stringContaining("builder-helper")
    );
    expect(within(rowFor("Milesopedia")).getByRole("img")).toHaveAttribute(
      "src",
      expect.stringContaining("milesopedia")
    );
    expect(within(rowFor("BrightWize")).getByRole("img")).toHaveAttribute(
      "src",
      expect.stringContaining("nestogroup")
    );
  });

  it("opens Builder Helper without a site link", () => {
    render(<Tangible showCta={false} />);

    fireEvent.click(screen.getByRole("button", { name: /^Builder Helper/ }));

    const row = rowFor("Builder Helper");
    expect(row).toHaveTextContent("Stripe Connect");
    expect(within(row).queryByRole("link")).toBeNull();
  });
});
