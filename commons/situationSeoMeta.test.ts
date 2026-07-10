import { getSituationSeo } from "./situationSeoMeta";

describe("situationSeoMeta", () => {
  it("exposes hero voice quote for LLM and machine-readable indexes", () => {
    const fr = getSituationSeo("fr", "situation-premier-dev-fractionnel");
    const en = getSituationSeo("en", "situation-premier-dev-fractionnel");

    expect(fr.voiceQuote).toMatch(/levé des fonds/i);
    expect(en.voiceQuote).toMatch(/We raised/i);
  });

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

  it("exposes four-step MVP/SaaS path for mvp-saas-faisabilite", () => {
    const fr = getSituationSeo("fr", "situation-mvp-saas-faisabilite");
    const en = getSituationSeo("en", "situation-mvp-saas-faisabilite");

    expect(fr.metaTitle).toMatch(/fractionnel/i);
    expect(fr.headline).toMatch(/SaaS|MVP/i);
    expect(fr.description).toMatch(/4 étapes/i);
    expect(fr.description).toMatch(/fractionnel/i);
    expect(fr.description).toMatch(/CEO\/CTO/i);
    expect(fr.description).toMatch(/Lovable|Cursor/i);
    expect(fr.description).toMatch(/backlog/i);
    expect(fr.description).toMatch(/pilotage|agence/i);

    expect(en.metaTitle).toMatch(/Fractional/i);
    expect(en.headline).toMatch(/SaaS|MVP/i);
    expect(en.description).toMatch(/four steps/i);
    expect(en.description).toMatch(/Fractional/i);
    expect(en.description).toMatch(/CEO\/CTO/i);
    expect(en.description).toMatch(/Lovable|Cursor/i);
    expect(en.description).toMatch(/backlog/i);
    expect(en.description).toMatch(/steering|agency/i);
  });

  it("exposes product AI scope (not MLOps) for ia-produit-garde-fous", () => {
    const fr = getSituationSeo("fr", "situation-ia-produit-garde-fous");
    const en = getSituationSeo("en", "situation-ia-produit-garde-fous");

    expect(fr.metaTitle).toMatch(/fractionnel|produit/i);
    expect(fr.description).toMatch(/4 étapes/i);
    expect(fr.description).toMatch(/prérequis|périmètre/i);
    expect(fr.description).toMatch(/hallucination/i);
    expect(fr.description).toMatch(/MLOps/i);
    expect(fr.description).toMatch(/Claude|OpenAI/i);

    expect(en.metaTitle).toMatch(/Fractional|product/i);
    expect(en.description).toMatch(/four-step/i);
    expect(en.description).toMatch(/prerequisites|scope/i);
    expect(en.description).toMatch(/hallucination/i);
    expect(en.description).toMatch(/MLOps/i);
    expect(en.description).toMatch(/Claude|OpenAI/i);
  });
});
