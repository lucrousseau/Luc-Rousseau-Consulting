import { SITUATION_SLUG_PAIRS } from "./situationSlugRoutes.mjs";

import { SITUATIONS } from "./situationsManifest";

describe("situationSlugRoutes", () => {
  it("matches situationsManifest slug pairs", () => {
    expect(SITUATION_SLUG_PAIRS).toEqual(
      SITUATIONS.map(({ slugFr, slugEn }) => ({ slugFr, slugEn }))
    );
  });
});
