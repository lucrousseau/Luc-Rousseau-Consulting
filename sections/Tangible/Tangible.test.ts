import { readFileSync } from "fs";
import { join } from "path";

import { PROJECT_LOGOS } from "./logos";

type LocaleItem = { id: string; title: string; content: string; "cta-link"?: string };

const loadItems = (lang: "fr" | "en"): LocaleItem[] =>
  JSON.parse(readFileSync(join(process.cwd(), "public", "locales", lang, "tangible.json"), "utf8"))
    .items;

describe("tangible cases", () => {
  const fr = loadItems("fr");
  const en = loadItems("en");

  it("lists the same cases, in the same order, in FR and EN", () => {
    expect(fr.map((item) => item.id)).toEqual(en.map((item) => item.id));
    expect(new Set(fr.map((item) => item.id)).size).toBe(fr.length);
  });

  it("puts Builder Helper first, linking to builderhelper.ca", () => {
    for (const items of [fr, en]) {
      expect(items[0]?.id).toBe("builder-helper");
      expect(items[0]?.["cta-link"]).toBe("https://builderhelper.ca");
    }
  });

  it("keeps each existing logo on its own case, whatever the position", () => {
    const ids = fr.map((item) => item.id);
    for (const id of Object.keys(PROJECT_LOGOS)) {
      expect(ids).toContain(id);
    }
    expect(Object.hasOwn(PROJECT_LOGOS, "builder-helper")).toBe(true);
  });
});
