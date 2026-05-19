const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");

// Colocated image dirs: sections/*/images, components/*/images, and legacy public/images
const IMAGE_DIRS = [
  path.join(ROOT, "public", "images"),
  path.join(ROOT, "sections", "HomeHero", "images"),
  path.join(ROOT, "sections", "WhoIWorkWith", "images"),
  path.join(ROOT, "sections", "Tangible", "images"),
];

/** Max width per directory (PageSpeed: right-sized sources for LCP and backgrounds). */
const MAX_WIDTH_BY_DIR = {
  HomeHero: 800,
  WhoIWorkWith: 1920,
  Tangible: 512,
};

function maxWidthFor(filePath) {
  const sectionName = path.basename(path.dirname(path.dirname(filePath)));
  return MAX_WIDTH_BY_DIR[sectionName] ?? 1200;
}

async function optimizeRaster(sourceFilePath) {
  const ext = path.extname(sourceFilePath).toLowerCase();
  if (!/\.(jpe?g|png)$/.test(ext)) return;

  const maxWidth = maxWidthFor(sourceFilePath);
  let pipeline = sharp(sourceFilePath);
  const meta = await pipeline.metadata();

  if (meta.width && meta.width > maxWidth) {
    pipeline = pipeline.resize(maxWidth, null, { withoutEnlargement: true });
  }

  const optimizedBuffer =
    ext === ".png"
      ? await pipeline.png({ quality: 85, compressionLevel: 9 }).toBuffer()
      : await pipeline.jpeg({ quality: 82, progressive: true, mozjpeg: true }).toBuffer();

  await fs.promises.writeFile(sourceFilePath, optimizedBuffer);
  await sharp(optimizedBuffer).webp({ quality: 85 }).toFile(`${sourceFilePath}.webp`);

  console.log(`Optimized ${path.relative(ROOT, sourceFilePath)} (max ${maxWidth}px) + WebP`);
}

async function convertDir(directoryPath) {
  // directoryPath from IMAGE_DIRS constant, not user input
  /* eslint-disable security/detect-non-literal-fs-filename */
  if (!fs.existsSync(directoryPath)) return;
  const files = fs.readdirSync(directoryPath);
  /* eslint-enable security/detect-non-literal-fs-filename */
  const tasks = files
    .filter((file) => file.match(/\.(jpg|jpeg|png)$/i) && !file.endsWith(".webp"))
    .map((file) => optimizeRaster(path.join(directoryPath, file)));
  await Promise.all(tasks);
}

(async () => {
  for (const dir of IMAGE_DIRS) {
    await convertDir(dir);
  }
})();
