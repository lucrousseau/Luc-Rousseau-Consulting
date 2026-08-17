/**
 * @jest-environment node
 */

import handler from "../../pages/api/robots";

const base = "https://lucrousseau.com";

/** Directives recognized by Google/Lighthouse robots.txt parsers. */
const KNOWN_DIRECTIVES = /^(User-agent|Allow|Disallow|Sitemap):/i;

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

function getDirectiveLines(body) {
  return body
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"));
}

describe("robots API", () => {
  it("emits only standard robots.txt directives", () => {
    const req = { method: "GET", headers: { host: "lucrousseau.com" } };
    const res = createMockRes();

    handler(req, res);

    expect(res.statusCode).toBe(200);
    expect(res.headers["Content-Type"]).toContain("text/plain");
    expect(res.body).toContain(`Sitemap: ${base}/sitemap.xml`);

    const unknown = getDirectiveLines(res.body).filter((line) => !KNOWN_DIRECTIVES.test(line));
    expect(unknown).toEqual([]);
  });

  it("keeps llms.txt and geo.kml as comments, not unknown directives", () => {
    const req = { method: "GET", headers: { host: "lucrousseau.com" } };
    const res = createMockRes();

    handler(req, res);

    expect(res.body).toContain(`# LLM-readable site summary (llmstxt.org): ${base}/llms.txt`);
    expect(res.body).toContain(`# Geo-targeting: ${base}/geo.kml`);
    expect(res.body).not.toMatch(/^LLMs-Txt:/m);
    expect(res.body).not.toMatch(/^KML:/m);
  });
});
