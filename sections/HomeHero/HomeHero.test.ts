import { HOME_HERO_PROFILE_SIZES } from "./index";

describe("HOME_HERO_PROFILE_SIZES", () => {
  it("requests a column-sized image on small phones, not 90vw", () => {
    expect(HOME_HERO_PROFILE_SIZES).toContain("(max-width: 576px) 70vw");
    expect(HOME_HERO_PROFILE_SIZES).not.toContain("90vw");
  });
});
