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

  it("exposes archaic WordPress phased rebuild for refonte-produit-par-phases", () => {
    const fr = getSituationSeo("fr", "situation-refonte-produit-par-phases");
    const en = getSituationSeo("en", "situation-refonte-produit-par-phases");

    expect(fr.headline).toMatch(/archaïque/i);
    expect(fr.metaTitle).toMatch(/headless/i);
    expect(fr.description).toMatch(/modernisation/i);
    expect(fr.description).not.toMatch(/1 à 3/i);
    expect(fr.description).not.toMatch(/trois journées/i);

    expect(en.headline).toMatch(/Archaic WordPress/i);
    expect(en.description).toMatch(/modern stack/i);
    expect(en.description).not.toMatch(/1–3 days/i);
    expect(en.description).not.toMatch(/one to three days/i);
  });
});
