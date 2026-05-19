const { getScheduleCta } = require("./scheduleCta");

describe("getScheduleCta", () => {
  const t = (key) => {
    if (key === "common:schedule-me") return "https://calendly.com/example";
    if (key === "common:schedule-me-label") return "Book a call";
    return key;
  };

  it("returns link and label from common namespace", () => {
    expect(getScheduleCta(t)).toEqual({
      link: "https://calendly.com/example",
      label: "Book a call",
    });
  });

  it("applies overrides when provided", () => {
    expect(
      getScheduleCta(t, {
        label: "Custom label",
        link: "https://example.com/meet",
      })
    ).toEqual({
      link: "https://example.com/meet",
      label: "Custom label",
    });
  });

  it("allows partial overrides", () => {
    expect(getScheduleCta(t, { label: "Only label" })).toEqual({
      link: "https://calendly.com/example",
      label: "Only label",
    });
  });
});
