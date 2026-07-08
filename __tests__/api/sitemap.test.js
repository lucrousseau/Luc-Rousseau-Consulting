/**
 * @jest-environment node
 */

import handler from "../../pages/api/sitemap";

const base = "https://lucrousseau.com";

function createMockRes() {
  const res = {
    statusCode: 200,
    headers: {},
    body: "",
    setHeader(name, value) {
      this.headers[name] = value;
    },
    status(code) {
      this.statusCode = code;
      return this;
    },
    send(payload) {
      this.body = payload;
      return this;
    },
  };
  return res;
}

describe("sitemap API", () => {
  it("includes expertise pages with hreflang alternates", () => {
    const req = { method: "GET", headers: { host: "lucrousseau.com" } };
    const res = createMockRes();

    handler(req, res);

    expect(res.statusCode).toBe(200);
    expect(res.headers["Content-Type"]).toContain("application/xml");
    expect(res.body).toContain(`${base}/expertise/wordpress-produit-editorial`);
    expect(res.body).toContain(`${base}/en/expertise/wordpress-editorial-product`);
    expect(res.body).toContain('hreflang="fr"');
    expect(res.body).toContain('hreflang="en"');
    expect(res.body).toContain('hreflang="x-default"');
  });

  it("includes all situation pages", () => {
    const req = { method: "GET", headers: { host: "lucrousseau.com" } };
    const res = createMockRes();

    handler(req, res);

    expect(res.body).toContain(`${base}/situations/plateforme-editoriale-produit`);
    expect(res.body).toContain(`${base}/situations/refonte-produit-par-phases`);
  });
});
