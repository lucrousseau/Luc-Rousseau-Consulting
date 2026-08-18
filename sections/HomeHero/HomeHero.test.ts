import { readFileSync } from "fs";
import { join } from "path";

import { HOME_HERO_PROFILE_SIZES } from "./index";

describe("HOME_HERO_PROFILE_SIZES", () => {
  it("requests a column-sized image on small phones, not 90vw", () => {
    expect(HOME_HERO_PROFILE_SIZES).toContain("(max-width: 576px) 70vw");
    expect(HOME_HERO_PROFILE_SIZES).not.toContain("90vw");
  });
});

describe("home hero type", () => {
  it("uses preloaded Quincy Black for above-fold h3s", () => {
    const scss = readFileSync(join(__dirname, "style.scss"), "utf8");
    expect(scss).toMatch(/h3\s*\{[^}]*font-weight:\s*900/s);
  });
});
