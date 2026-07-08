import { getBlockPageContactIntro } from "./blockPageContactIntro";

describe("getBlockPageContactIntro", () => {
  it("returns the teaser from the last cta block", () => {
    const blocks = [
      { type: "faq", items: [] },
      { type: "cta", teaser: "<p>First</p>" },
      { type: "stack", items: [] },
      { type: "cta", teaser: "<p>Last teaser</p>" },
    ];

    expect(getBlockPageContactIntro(blocks)).toBe("<p>Last teaser</p>");
  });

  it("returns null when there is no cta block with teaser", () => {
    expect(getBlockPageContactIntro(null)).toBeNull();
    expect(getBlockPageContactIntro([{ type: "faq" }])).toBeNull();
    expect(getBlockPageContactIntro([{ type: "cta", teaser: "   " }])).toBeNull();
  });
});
