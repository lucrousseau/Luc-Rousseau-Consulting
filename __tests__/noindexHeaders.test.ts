/**
 * @jest-environment node
 */
import { readFileSync } from "node:fs";
import path from "node:path";

import { NOINDEX_HEADER, noindexHeaderRules } from "../lib/noindexHeaders.mjs";

/**
 * Minimal matcher for the two source shapes used here (literal and `/:path*`), with the
 * optional locale prefix Next adds to header sources when `locale` is not false.
 */
function matches(source: string, localized: string): boolean {
  const pathname = localized.replace(/^\/(en|fr)(?=\/|$)/, "") || "/";
  if (source.endsWith("/:path*")) {
    const prefix = source.slice(0, -"/:path*".length);
    return pathname === prefix || pathname.startsWith(`${prefix}/`);
  }
  return pathname === source;
}

const isNoindexed = (pathname: string) =>
  noindexHeaderRules.some(
    (rule) =>
      matches(rule.source, pathname) &&
      !("locale" in rule) &&
      rule.headers.some(
        (header) => header.key === NOINDEX_HEADER.key && header.value === "noindex, nofollow"
      )
  );

describe("noindex headers", () => {
  it.each(["/media-kit", "/en/media-kit", "/fr/media-kit"])("covers the page at %s", (page) => {
    expect(isNoindexed(page)).toBe(true);
  });

  it("covers every downloadable media kit file", () => {
    const kit = JSON.parse(
      readFileSync(path.join(__dirname, "..", "commons", "mediaKit.json"), "utf8")
    ) as { groups: { files: { file: string }[] }[] };
    for (const { file } of kit.groups.flatMap((group) => group.files)) {
      expect(isNoindexed(`/media-kit/${file}`)).toBe(true);
    }
  });

  it("leaves the rest of the site indexable", () => {
    for (const pathname of ["/", "/en", "/about", "/situations", "/favicon/site.webmanifest"]) {
      expect(isNoindexed(pathname)).toBe(false);
    }
  });

  it("is wired into next.config.mjs", () => {
    const config = readFileSync(path.join(__dirname, "..", "next.config.mjs"), "utf8");
    expect(config).toContain("...noindexHeaderRules");
  });
});
