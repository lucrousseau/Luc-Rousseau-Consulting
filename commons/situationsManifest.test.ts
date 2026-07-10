const {
  SITUATIONS,
  getSituationBySlug,
  getSituationPath,
  getAllSituationSlugs,
} = require("./situationsManifest");

describe("situationsManifest", () => {
  it("exposes English slugs distinct from French where needed", () => {
    const firstHire = SITUATIONS.find((situation) => situation.id === "premier-dev-fractionnel");
    expect(firstHire.slugFr).toBe("premier-dev-fractionnel");
    expect(firstHire.slugEn).toBe("post-funding-first-developer");
  });

  it("resolves situations by locale-specific slug", () => {
    expect(getSituationBySlug("premier-dev-fractionnel", "fr")?.id).toBe("premier-dev-fractionnel");
    expect(getSituationBySlug("post-funding-first-developer", "en")?.id).toBe(
      "premier-dev-fractionnel"
    );
    expect(getSituationBySlug("premier-dev-fractionnel", "en")).toBeUndefined();
  });

  it("builds locale-specific paths", () => {
    const situation = SITUATIONS[0];
    expect(getSituationPath(situation, "fr")).toBe("/situations/premier-dev-fractionnel");
    expect(getSituationPath(situation, "en")).toBe("/situations/post-funding-first-developer");
  });

  it("lists slugs per locale for static paths", () => {
    expect(getAllSituationSlugs("en")).toContain("post-funding-first-developer");
    expect(getAllSituationSlugs("en")).not.toContain("premier-dev-fractionnel");
    expect(getAllSituationSlugs("fr")).toContain("premier-dev-fractionnel");
  });
});
