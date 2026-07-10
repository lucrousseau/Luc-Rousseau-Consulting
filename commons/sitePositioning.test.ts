import fs from "fs";
import path from "path";

import { HOME_SEO } from "./sitePositioning";

const LOCALES_DIR = path.join(process.cwd(), "public", "locales");

function loadHomeJson(locale) {
  const filePath = path.join(LOCALES_DIR, locale, "home.json");
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

describe("sitePositioning", () => {
  it.each(["fr", "en"])("matches home.json SEO description for %s", (locale) => {
    const home = loadHomeJson(locale);
    expect(home["home-seo-description"]).toBe(HOME_SEO[locale].description);
  });
});
