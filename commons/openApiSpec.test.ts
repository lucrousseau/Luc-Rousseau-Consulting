/** @jest-environment node */

import { buildOpenApiSpec } from "./openApiSpec";

const base = "https://lucrousseau.com";

describe("openApiSpec", () => {
  it("describes Luc Rousseau public discovery endpoints", () => {
    const spec = buildOpenApiSpec(base);

    expect(spec.openapi).toBe("3.1.0");
    expect(spec.info.title).toMatch(/Luc Rousseau/i);
    expect(spec.paths["/openapi.json"]).toBeDefined();
    expect(spec.paths["/llms.txt"]).toBeDefined();
    expect(spec.paths["/sitemap.xml"]).toBeDefined();
    expect(spec.paths["/developers"]).toBeDefined();
    expect(spec.paths["/"].get.summary).toMatch(/Markdown/i);
    expect(spec.components.schemas.ApiError).toBeDefined();
    expect(spec.externalDocs.url).toBe(`${base}/developers`);
  });
});
