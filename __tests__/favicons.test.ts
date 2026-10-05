/**
 * @jest-environment node
 */
import { readFileSync } from "node:fs";
import path from "node:path";

import sharp from "sharp";

import { ICONS, ICO_PNGS, buildIco, renderIcon } from "../scripts/generate-favicons.mjs";

const root = path.resolve(__dirname, "..");
const publicDir = path.join(root, "public");
const readPublic = (...parts: string[]) => readFileSync(path.join(publicDir, ...parts));

/** Raw RGBA, so a transparent background turned opaque (or the reverse) shows up. */
const rgba = (input: Buffer) => sharp(input).ensureAlpha().raw().toBuffer();

describe("site icons", () => {
  it.each(ICONS)("$png matches its SVG source ($svg)", async (icon) => {
    const committed = readPublic("favicon", icon.png);
    const meta = await sharp(committed).metadata();
    expect(meta.width).toBe(icon.size);
    expect(meta.height).toBe(icon.size);
    expect(meta.hasAlpha).toBe(!icon.opaque);

    // Not byte equality: a libvips upgrade shifts anti-aliasing on stroke edges. A redrawn
    // or recoloured SVG left without `npm run favicons` moves far more channels, by more.
    const [expected, actual] = await Promise.all([rgba(await renderIcon(icon)), rgba(committed)]);
    expect(actual.length).toBe(expected.length);
    let off = 0;
    for (let i = 0; i < expected.length; i++) {
      if (Math.abs(expected[i] - actual[i]) > 8) off++;
    }
    expect(off / expected.length).toBeLessThan(0.01);
  });

  it("builds favicon.ico from the committed 16 and 32 px PNGs", () => {
    const expected = buildIco(
      ICO_PNGS.map((png) => ({
        size: ICONS.find((icon) => icon.png === png)!.size,
        data: readPublic("favicon", png),
      }))
    );
    expect(readPublic("favicon", "favicon.ico").equals(expected)).toBe(true);
    expect(readPublic("favicon.ico").equals(expected)).toBe(true);
  });

  it("points every manifest icon at a file that exists", () => {
    const manifest = JSON.parse(readPublic("favicon", "site.webmanifest").toString("utf8")) as {
      icons: { src: string }[];
    };
    for (const { src } of manifest.icons) {
      expect(src.startsWith("/")).toBe(true);
      expect(() => readPublic(src)).not.toThrow();
    }
  });
});
