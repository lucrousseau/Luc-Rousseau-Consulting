/**
 * @jest-environment node
 */

import { NextRequest } from "next/server";

import { proxy } from "../proxy";

function makeRequest(path: string, accept?: string) {
  const headers = new Headers();
  if (accept) {
    headers.set("accept", accept);
  }
  const request = new NextRequest(`https://lucrousseau.com${path}`, {
    method: "GET",
    headers,
  });
  Object.defineProperty(request.nextUrl, "locale", {
    value: path.startsWith("/en") ? "en" : "fr",
    configurable: true,
  });
  return request;
}

describe("proxy markdown negotiation", () => {
  it("returns markdown for Accept: text/markdown on the home page", async () => {
    const response = proxy(makeRequest("/", "text/markdown"));

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("text/markdown");
    expect(response.headers.get("vary")?.toLowerCase()).toContain("accept");
    const body = await response.text();
    expect(body).toContain("Luc Rousseau");
  });

  it("returns markdown 404 with recovery links for unknown paths", async () => {
    const response = proxy(makeRequest("/agent-audit-missing-path-xyz", "text/markdown"));

    expect(response.status).toBe(404);
    expect(response.headers.get("content-type")).toContain("text/markdown");
    const body = await response.text();
    expect(body).toContain("llms.txt");
    expect(body).toContain("openapi.json");
    expect(body).toContain("developers");
  });

  it("passes HTML through with Vary: Accept", () => {
    const response = proxy(
      makeRequest("/", "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8")
    );

    expect(response.status).toBe(200);
    expect(response.headers.get("vary")?.toLowerCase()).toContain("accept");
  });
});
