/**
 * Génère les icônes du site (favicons, apple-touch-icon, android-chrome, favicon.ico)
 * à partir des SVG du symbole, sous `assets/brand/symbole/`.
 *
 * Les SVG font foi ; les PNG et l'ICO sous `public/` en sont dérivés et ne se retouchent
 * jamais à la main. Après toute retouche d'un SVG : `npm run favicons`, puis committer les
 * deux ensemble. Le test `__tests__/favicons.test.ts` échoue si un raster ne correspond
 * plus à sa source.
 *
 * Les SVG viennent du générateur de Jeff (TK-398, symbole A6 approuvé par Luc le
 * 2026-10-05). Les 16 et 32 px ont leur propre dessin (trait épaissi, jour élargi) :
 * ce ne sont pas des réductions du maître `lrc-symbole.svg`.
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = path.join(root, "assets/brand/symbole");
const favicon = path.join(root, "public/favicon");

/** Craie de la charte LRC : fond des icônes opaques. */
const CHALK = "#f6f5f5";

/**
 * `opaque` : icône sans canal alpha (iOS remplit la transparence en noir).
 * Chaque SVG est dessiné sur sa propre grille, rendu à 72 dpi il sort à la taille voulue.
 */
export const ICONS = [
  { svg: "lrc-symbole-16.svg", png: "favicon-16x16.png", size: 16, opaque: false },
  { svg: "lrc-symbole-32.svg", png: "favicon-32x32.png", size: 32, opaque: false },
  { svg: "apple-touch-icon.svg", png: "apple-touch-icon.png", size: 180, opaque: true },
  { svg: "android-chrome-192.svg", png: "android-chrome-192x192.png", size: 192, opaque: true },
  { svg: "android-chrome-512.svg", png: "android-chrome-512x512.png", size: 512, opaque: true },
];

/** Tailles embarquées dans favicon.ico (PNG intégrés). */
const ICO_SIZES = [16, 32];

export async function renderIcon({ svg, size, opaque }) {
  let image = sharp(path.join(source, svg), { density: 72 }).resize(size, size, { fit: "fill" });
  image = opaque ? image.flatten({ background: CHALK }).removeAlpha() : image.ensureAlpha();
  return image.png({ compressionLevel: 9 }).toBuffer();
}

/** Assemble un ICO à partir de PNG (format accepté par tous les navigateurs actuels). */
export function buildIco(pngs) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(pngs.length, 4);
  let offset = 6 + 16 * pngs.length;
  const entries = pngs.map(({ size, data }) => {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0);
    entry.writeUInt8(size >= 256 ? 0 : size, 1);
    entry.writeUInt8(0, 2);
    entry.writeUInt8(0, 3);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += data.length;
    return entry;
  });
  return Buffer.concat([header, ...entries, ...pngs.map(({ data }) => data)]);
}

async function main() {
  await mkdir(favicon, { recursive: true });
  const rendered = new Map();
  for (const icon of ICONS) {
    const data = await renderIcon(icon);
    rendered.set(icon.size, data);
    // icon.png vient de la liste ICONS ci-dessus, jamais d'une entrée externe.
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    await writeFile(path.join(favicon, icon.png), data);
    console.log(`public/favicon/${icon.png}`);
  }
  const ico = buildIco(ICO_SIZES.map((size) => ({ size, data: rendered.get(size) })));
  await writeFile(path.join(favicon, "favicon.ico"), ico);
  await writeFile(path.join(root, "public/favicon.ico"), ico);
  console.log("public/favicon/favicon.ico, public/favicon.ico");
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
