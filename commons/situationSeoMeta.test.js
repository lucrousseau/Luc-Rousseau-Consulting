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

  it("exposes editorial platform conversion and Quebec references for plateforme-editoriale-produit", () => {
    const fr = getSituationSeo("fr", "situation-plateforme-editoriale-produit");
    const en = getSituationSeo("en", "situation-plateforme-editoriale-produit");

    expect(fr.headline).toMatch(/éditorial/i);
    expect(fr.metaTitle).toMatch(/comparateurs/i);
    expect(fr.description).toMatch(/conversion/i);
    expect(fr.description).toMatch(/Milesopedia/i);
    expect(fr.description).toMatch(/Québec/i);

    expect(en.headline).toMatch(/Editorial product/i);
    expect(en.metaTitle).toMatch(/comparators/i);
    expect(en.description).toMatch(/conversion/i);
    expect(en.description).toMatch(/Milesopedia/i);
    expect(en.description).toMatch(/Quebec/i);
  });

  it("exposes four-step post-funding path for premier-dev-fractionnel", () => {
    const fr = getSituationSeo("fr", "situation-premier-dev-fractionnel");
    const en = getSituationSeo("en", "situation-premier-dev-fractionnel");

    expect(fr.headline).toMatch(/premier dev/i);
    expect(fr.metaTitle).toMatch(/2 j\/sem/i);
    expect(fr.description).toMatch(/4 étapes/i);
    expect(fr.description).toMatch(/embauche/i);

    expect(en.headline).toMatch(/first full-time developer/i);
    expect(en.description).toMatch(/four-step/i);
    expect(en.description).toMatch(/hire prep/i);
  });
});
