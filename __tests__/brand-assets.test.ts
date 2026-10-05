/**
 * @jest-environment node
 */
import { readFileSync } from "node:fs";
import path from "node:path";

import sharp from "sharp";

import {
  FAVICON_DIR,
  PNG_DIR,
  RASTERS,
  ROOT,
  buildIcoFrom,
  renderRaster,
} from "../scripts/generate-brand-assets.mjs";

const read = (...parts: string[]) => readFileSync(path.join(...parts));
const readPng = (name: string) => read(PNG_DIR, name);

/** Raw RGBA, so a transparent background turned opaque (or the reverse) shows up. */
const rgba = (input: Buffer) => sharp(input).ensureAlpha().raw().toBuffer();

describe("brand assets", () => {
  it.each(RASTERS)("brand/png/$png matches its SVG source ($svg)", async (raster) => {
    const committed = readPng(raster.png);
    const meta = await sharp(committed).metadata();
    expect(meta.width).toBe(raster.size);
    expect(meta.height).toBe(raster.size);
    expect(meta.hasAlpha).toBe(!raster.opaque);

    // Not byte equality: a libvips upgrade shifts anti-aliasing on stroke edges. A redrawn
    // or recoloured SVG left without `npm run brand` moves far more channels, by more.
    const [expected, actual] = await Promise.all([
      rgba(await renderRaster(raster)),
      rgba(committed),
    ]);
    expect(actual.length).toBe(expected.length);
    let off = 0;
    for (let i = 0; i < expected.length; i++) {
      if (Math.abs(expected[i] - actual[i]) > 8) off++;
    }
    expect(off / expected.length).toBeLessThan(0.01);
  });

  it.each(RASTERS.filter((raster) => raster.site))(
    "public/favicon/$site is an exact copy of brand/png/$png",
    ({ png, site }) => {
      expect(read(FAVICON_DIR, site!).equals(readPng(png))).toBe(true);
    }
  );

  it("builds every favicon.ico from the committed 16 and 32 px PNGs", () => {
    const expected = buildIcoFrom(readPng);
    expect(readPng("favicon.ico").equals(expected)).toBe(true);
    expect(read(FAVICON_DIR, "favicon.ico").equals(expected)).toBe(true);
    expect(read(ROOT, "public", "favicon.ico").equals(expected)).toBe(true);
  });

  it("points every manifest icon at a file that exists", () => {
    const manifest = JSON.parse(read(FAVICON_DIR, "site.webmanifest").toString("utf8")) as {
      icons: { src: string }[];
    };
    for (const { src } of manifest.icons) {
      expect(src.startsWith("/")).toBe(true);
      expect(() => read(ROOT, "public", src)).not.toThrow();
    }
  });
});
