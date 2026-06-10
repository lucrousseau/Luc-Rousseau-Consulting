import { getSituationContactIntro } from "./situationContactIntro";

describe("getSituationContactIntro", () => {
  it("returns the teaser from the last cta block", () => {
    const blocks = [
      { type: "faq", items: [] },
      { type: "cta", teaser: "<p>First</p>" },
      { type: "stack", items: [] },
      { type: "cta", teaser: "<p>Last teaser</p>" },
    ];

    expect(getSituationContactIntro(blocks)).toBe("<p>Last teaser</p>");
  });

  it("returns null when there is no cta block with teaser", () => {
    expect(getSituationContactIntro(null)).toBeNull();
    expect(getSituationContactIntro([{ type: "faq" }])).toBeNull();
    expect(getSituationContactIntro([{ type: "cta", teaser: "   " }])).toBeNull();
  });
});
