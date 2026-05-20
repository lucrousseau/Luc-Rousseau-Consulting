import {
  buildBreadcrumbListJsonLd,
  buildSituationPageBreadcrumbJsonLd,
  buildSituationsHubJsonLd,
} from "./situationsStructuredData";

const base = "https://lucrousseau.com";

describe("situationsStructuredData", () => {
  it("builds FR hub breadcrumbs and item list", () => {
    const [breadcrumb, collection] = buildSituationsHubJsonLd({
      base,
      locale: "fr",
      defaultLocale: "fr",
      pageUrl: `${base}/situations`,
      pageName: "Situations",
      pageDescription: "Hub description",
      homeLabel: "Accueil",
      situationsHubLabel: "Situations",
      situations: [{ slug: "mvp-saas-faisabilite", name: "MVP SaaS" }],
    });

    expect(breadcrumb.itemListElement).toHaveLength(2);
    expect(breadcrumb.itemListElement[0].item).toBe(`${base}/`);
    expect(breadcrumb.itemListElement[1].item).toBeUndefined();
    expect(collection.mainEntity.numberOfItems).toBe(1);
    expect(collection.mainEntity.itemListElement[0].url).toBe(
      `${base}/situations/mvp-saas-faisabilite`
    );
  });

  it("builds EN situation breadcrumb with locale prefix", () => {
    const breadcrumb = buildSituationPageBreadcrumbJsonLd({
      base,
      locale: "en",
      defaultLocale: "fr",
      homeLabel: "Home",
      situationsHubLabel: "Situations",
      situationTitle: "Solo dev",
    });

    expect(breadcrumb.itemListElement[1].item).toBe(`${base}/en/situations`);
    expect(breadcrumb.itemListElement[2].item).toBeUndefined();
  });
});
