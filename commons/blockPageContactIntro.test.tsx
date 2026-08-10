import { getBlockPageContactIntro, getBlockPageTrackSection } from "./blockPageContactIntro";

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

describe("getBlockPageTrackSection", () => {
  it("returns trackSection from the last cta block", () => {
    const blocks = [
      { type: "cta", trackSection: "situation-premier-dev", teaser: "<p>x</p>" },
      { type: "cta", trackSection: "situation-solo-dev", teaser: "<p>y</p>" },
    ];

    expect(getBlockPageTrackSection(blocks, "situation-hero")).toBe("situation-solo-dev");
  });

  it("returns fallback when trackSection is missing", () => {
    expect(getBlockPageTrackSection(null, "situation-hero")).toBe("situation-hero");
    expect(getBlockPageTrackSection([{ type: "faq" }], "situation-hero")).toBe("situation-hero");
    expect(getBlockPageTrackSection([{ type: "cta", teaser: "x" }], "situation-hero")).toBe(
      "situation-hero"
    );
  });
});
