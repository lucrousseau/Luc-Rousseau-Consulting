/**
 * @jest-environment node
 */
import { readFileSync } from "node:fs";
import path from "node:path";

import sharp from "sharp";

import { ICONS, renderIcon } from "../scripts/generate-favicons.mjs";

const root = path.resolve(__dirname, "..");
const publicDir = path.join(root, "public");

describe("site icons", () => {
  it.each(ICONS)("$png matches its SVG source ($svg)", async (icon) => {
    const committed = readFileSync(path.join(publicDir, "favicon", icon.png));
    const meta = await sharp(committed).metadata();
    expect(meta.width).toBe(icon.size);
    expect(meta.height).toBe(icon.size);
    expect(meta.hasAlpha).toBe(!icon.opaque);

    // Tolerance, not byte equality: a libvips upgrade shifts anti-aliasing slightly.
    // A redrawn SVG left without `npm run favicons` moves far more than this.
    const flat = (input: Buffer) =>
      sharp(input).flatten({ background: "#ffffff" }).removeAlpha().raw().toBuffer();
    const [expected, actual] = await Promise.all([flat(await renderIcon(icon)), flat(committed)]);
    const meanDiff = expected.reduce((sum, value, i) => sum + Math.abs(value - actual[i]), 0);
    expect(meanDiff / expected.length).toBeLessThan(1);
  });

  it("serves the same favicon.ico at the root and under /favicon", () => {
    const rootIco = readFileSync(path.join(publicDir, "favicon.ico"));
    const nestedIco = readFileSync(path.join(publicDir, "favicon", "favicon.ico"));
    expect(rootIco.equals(nestedIco)).toBe(true);
  });

  it("points every manifest icon at a file that exists", () => {
    const manifest = JSON.parse(
      readFileSync(path.join(publicDir, "favicon", "site.webmanifest"), "utf8")
    ) as { icons: { src: string }[] };
    for (const { src } of manifest.icons) {
      expect(src.startsWith("/")).toBe(true);
      expect(() => readFileSync(path.join(publicDir, src))).not.toThrow();
    }
  });
});
