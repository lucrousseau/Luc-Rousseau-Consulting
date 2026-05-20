const { getSituationSeo } = require("./situationSeoMeta");

describe("situationSeoMeta", () => {
  it("exposes half-day fractional rhythm for product-manager-fractionnel", () => {
    const fr = getSituationSeo("fr", "situation-product-manager-fractionnel");
    const en = getSituationSeo("en", "situation-product-manager-fractionnel");

    expect(fr.metaTitle).toMatch(/fractionnel/i);
    expect(fr.metaTitle).toMatch(/demi-journées/i);
    expect(fr.description).toMatch(/demi-journées/i);
    expect(fr.description).not.toMatch(/quatre jours par semaine/i);

    expect(en.metaTitle).toMatch(/Fractional PM/i);
    expect(en.metaTitle).toMatch(/half-days/i);
    expect(en.description).toMatch(/half-days/i);
    expect(en.description).not.toMatch(/four days per week/i);
  });
});
