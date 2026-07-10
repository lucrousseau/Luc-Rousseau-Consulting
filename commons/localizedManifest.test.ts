import { createLocalizedManifest } from "./localizedManifest";

describe("localizedManifest", () => {
  const entries = [
    {
      id: "sample-page",
      slugFr: "page-fr",
      slugEn: "page-en",
      namespace: "sample",
      publishedAt: "2026-01-01",
    },
  ];

  const manifest = createLocalizedManifest("/samples", entries);

  it("builds locale-specific paths", () => {
    expect(manifest.getPath(entries[0], "fr")).toBe("/samples/page-fr");
    expect(manifest.getPath(entries[0], "en")).toBe("/samples/page-en");
  });

  it("resolves entries by locale-specific slug", () => {
    expect(manifest.getBySlug("page-fr", "fr")?.id).toBe("sample-page");
    expect(manifest.getBySlug("page-en", "en")?.id).toBe("sample-page");
    expect(manifest.getBySlug("page-fr", "en")).toBeUndefined();
  });

  it("lists slugs per locale for static paths", () => {
    expect(manifest.getAllSlugs("fr")).toEqual(["page-fr"]);
    expect(manifest.getAllSlugs("en")).toEqual(["page-en"]);
  });
});
