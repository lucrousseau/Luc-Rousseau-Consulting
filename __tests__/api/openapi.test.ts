/**
 * @jest-environment node
 */

import handler from "../../pages/api/openapi.json";

function createMockRes() {
  const res = {
    statusCode: 200,
    headers: {},
    body: null,
    setHeader(name, value) {
      this.headers[name] = value;
    },
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.body = payload;
      return this;
    },
    end(payload) {
      this.body = payload;
      return this;
    },
  };
  return res;
}

describe("openapi.json API", () => {
  it("returns OpenAPI JSON for GET", () => {
    const req = { method: "GET", headers: { host: "lucrousseau.com" } };
    const res = createMockRes();

    handler(req, res);

    expect(res.statusCode).toBe(200);
    expect(res.headers["Content-Type"]).toContain("application/json");
    expect(res.body.openapi).toBe("3.1.0");
    expect(res.body.info.title).toMatch(/Luc Rousseau/i);
    expect(res.body.paths["/llms.txt"]).toBeDefined();
  });

  it("returns JSON 405 for POST", () => {
    const req = { method: "POST", headers: { host: "lucrousseau.com" } };
    const res = createMockRes();

    handler(req, res);

    expect(res.statusCode).toBe(405);
    const body = typeof res.body === "string" ? JSON.parse(res.body) : res.body;
    expect(body.error.code).toBe("method_not_allowed");
    expect(body.error.hint).toMatch(/openapi/i);
  });
});
