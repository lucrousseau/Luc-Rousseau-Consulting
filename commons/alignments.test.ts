import { alignments } from "./alignments";

describe("alignments", () => {
  it("returns empty string when no alignment props", () => {
    expect(alignments({ props: {} })).toBe("");
  });

  it("returns align class when align is set", () => {
    expect(alignments({ props: { align: "center" } })).toBe("align--center");
  });

  it("returns halign class with default prefix row", () => {
    expect(alignments({ props: { halign: "middle" } })).toBe("row--middle");
  });

  it("returns valign class when valign is set", () => {
    expect(alignments({ props: { valign: "top" } })).toBe("row--top");
  });

  it("uses custom prefix when provided", () => {
    expect(alignments({ prefix: "grid", props: { halign: "center" } })).toBe("grid--center");
  });

  it("combines multiple alignments", () => {
    const result = alignments({ props: { align: "right", halign: "middle", valign: "top" } });
    expect(result).toContain("align--right");
    expect(result).toContain("row--middle");
    expect(result).toContain("row--top");
  });
});
