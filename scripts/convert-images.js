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

async function convertDir(directoryPath) {
  // directoryPath from IMAGE_DIRS constant, not user input
  /* eslint-disable security/detect-non-literal-fs-filename */
  if (!fs.existsSync(directoryPath)) return;
  const files = fs.readdirSync(directoryPath);
  /* eslint-enable security/detect-non-literal-fs-filename */
  const tasks = files
    .filter((file) => file.match(/\.(jpg|jpeg|png)$/))
    .map(async (file) => {
      const sourceFilePath = path.join(directoryPath, file);
      const targetFilePath = `${sourceFilePath}.webp`;
      await sharp(sourceFilePath).webp({ quality: 90 }).toFile(targetFilePath);
      console.log(`Converted ${path.relative(ROOT, sourceFilePath)} to WebP`);
    });
  await Promise.all(tasks);
}

(async () => {
  for (const dir of IMAGE_DIRS) {
    await convertDir(dir);
  }
})();
