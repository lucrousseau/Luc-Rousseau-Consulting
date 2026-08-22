/**
 * @jest-environment node
 */

import handler from "../../pages/api/[...path]";

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

describe("API catch-all", () => {
  it("returns JSON 404 for unknown API paths", () => {
    const req = {
      method: "GET",
      headers: { host: "lucrousseau.com" },
      query: { path: ["does-not-exist"] },
    };
    const res = createMockRes();

    handler(req, res);

    expect(res.statusCode).toBe(404);
    const body = typeof res.body === "string" ? JSON.parse(res.body) : res.body;
    expect(body.error.code).toBe("not_found");
    expect(body.error.hint).toContain("openapi.json");
    expect(body.error.hint).toContain("developers");
  });
});
