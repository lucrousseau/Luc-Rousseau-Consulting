import { fireEvent, render, screen } from "@testing-library/react";

import Accordion from "./index";
import { trackAccordionOpen } from "../../utils/analytics";

jest.mock("../../utils/analytics", () => ({
  trackAccordionOpen: jest.fn(),
}));

describe("Accordion analytics", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("tracks accordion_open with the item title", () => {
    render(
      <Accordion
        items={[
          { title: "Quel est le délai ?", content: <p>Deux semaines</p> },
          { title: "Comment ça marche ?", content: <p>On démarre</p> },
        ]}
        trackSection="faq"
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /Quel est le délai/i }));

    expect(trackAccordionOpen).toHaveBeenCalledWith("faq", "Quel est le délai ?", undefined);
  });

  it("forwards trackProps (e.g. page) to accordion tracking", () => {
    render(
      <Accordion
        items={[{ title: "Combien de jours ?", content: <p>2 a 3</p> }]}
        trackSection="situation-faq"
        trackProps={{ page: "premier-dev-fractionnel" }}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /Combien de jours/i }));

    expect(trackAccordionOpen).toHaveBeenCalledWith("situation-faq", "Combien de jours ?", {
      page: "premier-dev-fractionnel",
    });
  });

  it("does not track when collapsing an open item", () => {
    render(
      <Accordion
        items={[{ title: "Ouvert", content: <p>Contenu</p> }]}
        trackSection="faq"
        activeIndex={0}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /Ouvert/i }));
    expect(trackAccordionOpen).not.toHaveBeenCalled();
  });
});
