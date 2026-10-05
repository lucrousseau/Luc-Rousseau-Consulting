/**
 * Génère tous les fichiers dérivés du symbole à partir de ses SVG, sous `brand/symbole/`.
 *
 * Une seule source, un seul moteur de rendu :
 * - `brand/png/` : les PNG et l'ICO du kit de marque ;
 * - `public/favicon/` et `public/favicon.ico` : les icônes du site, copies exactes des
 *   fichiers de `brand/png/` sous les noms que le site attend.
 *
 * Les SVG font foi ; rien de ce qui est généré ici ne se retouche à la main. Après toute
 * retouche d'un SVG (à la main ou par `brand/symbole/generer.py`) : `npm run brand`, puis
 * committer le tout ensemble. `__tests__/brand-assets.test.ts` échoue sinon.
 *
 * Les 16 et 32 px ont leur propre dessin (trait épaissi, jour élargi) : ce ne sont pas
 * des réductions du maître `lrc-symbole.svg`.
 */
import { realpathSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
export const SOURCE_DIR = path.join(ROOT, "brand/symbole");
export const PNG_DIR = path.join(ROOT, "brand/png");
export const FAVICON_DIR = path.join(ROOT, "public/favicon");

/** Craie de la charte LRC : fond des icônes opaques. */
const CHALK = "#f6f5f5";

/**
 * - `png` : nom dans `brand/png/` ;
 * - `site` : nom dans `public/favicon/`, si le site s'en sert ;
 * - `opaque` : sans canal alpha (iOS remplit la transparence en noir).
 * Chaque SVG est dessiné sur sa propre grille ; rendu à 72 dpi, il sort à la taille voulue.
 */
export const RASTERS = [
  { svg: "lrc-symbole-16.svg", png: "favicon-16.png", site: "favicon-16x16.png", size: 16 },
  { svg: "lrc-symbole-32.svg", png: "favicon-32.png", site: "favicon-32x32.png", size: 32 },
  {
    svg: "apple-touch-icon.svg",
    png: "apple-touch-icon.png",
    site: "apple-touch-icon.png",
    size: 180,
    opaque: true,
  },
  {
    svg: "android-chrome-192.svg",
    png: "android-chrome-192.png",
    site: "android-chrome-192x192.png",
    size: 192,
    opaque: true,
  },
  {
    svg: "android-chrome-512.svg",
    png: "android-chrome-512.png",
    site: "android-chrome-512x512.png",
    size: 512,
    opaque: true,
  },
  { svg: "linkedin-avatar-400.svg", png: "linkedin-avatar-400.png", size: 400, opaque: true },
];

/** PNG embarqués dans favicon.ico : 16 et 32, comme l'ICO approuvé (TK-398). */
export const ICO_PNGS = ["favicon-16.png", "favicon-32.png"];

export async function renderRaster({ svg, size, opaque = false }) {
  let image = sharp(path.join(SOURCE_DIR, svg), { density: 72 }).resize(size, size, {
    fit: "fill",
  });
  image = opaque ? image.flatten({ background: CHALK }).removeAlpha() : image.ensureAlpha();
  return image.png({ compressionLevel: 9 }).toBuffer();
}

/**
 * Assemble un ICO à partir de PNG (format accepté par tous les navigateurs actuels).
 * @param {{ size: number, data: Buffer }[]} pngs
 */
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

/** @param {(name: string) => Buffer} readPng contenu d'un PNG de `brand/png/` */
export function buildIcoFrom(readPng) {
  return buildIco(
    ICO_PNGS.map((png) => ({
      size: RASTERS.find((raster) => raster.png === png).size,
      data: readPng(png),
    }))
  );
}

/** Écrit un fichier sous la racine du dépôt ; les chemins viennent des listes ci-dessus. */
async function emit(dir, name, data) {
  /* eslint-disable security/detect-non-literal-fs-filename */
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, name), data);
  /* eslint-enable security/detect-non-literal-fs-filename */
  console.log(path.relative(ROOT, path.join(dir, name)));
}

async function main() {
  const rendered = new Map();
  for (const raster of RASTERS) {
    const data = await renderRaster(raster);
    rendered.set(raster.png, data);
    await emit(PNG_DIR, raster.png, data);
    if (raster.site) await emit(FAVICON_DIR, raster.site, data);
  }
  const ico = buildIcoFrom((png) => rendered.get(png));
  await emit(PNG_DIR, "favicon.ico", ico);
  await emit(FAVICON_DIR, "favicon.ico", ico);
  await emit(path.join(ROOT, "public"), "favicon.ico", ico);
}

/** realpath : lancé par un lien symbolique, argv[1] ne vaudrait pas le chemin du module. */
function isEntryPoint() {
  if (!process.argv[1]) return false;
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  return realpathSync(process.argv[1]) === fileURLToPath(import.meta.url);
}

if (isEntryPoint()) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
