#!/usr/bin/env node
/**
 * Fail the build if any .scss file uses lowercase Sass function names
 * that are defined in styles/abstracts/_mixins.scss with capital letters.
 * Sass is case-sensitive: getprefix → getPrefix, findpreviousbreakepoint → findPreviousBreakepoint.
 */

const fs = require("fs");
const path = require("path");

const BAD_PATTERNS = [
  { pattern: /getprefix\s*\(/g, correct: "getPrefix" },
  { pattern: /findpreviousbreakepoint\s*\(/g, correct: "findPreviousBreakepoint" },
];

const ROOT = path.resolve(__dirname, "..");
const IGNORE_DIRS = new Set(["node_modules", ".next", ".git"]);

function findScssFiles(dir, files = []) {
  /* eslint-disable security/detect-non-literal-fs-filename -- dir is from project root */
  if (!fs.existsSync(dir)) return files;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  /* eslint-enable security/detect-non-literal-fs-filename */
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory() && !IGNORE_DIRS.has(e.name)) {
      findScssFiles(full, files);
    } else if (e.isFile() && e.name.endsWith(".scss")) {
      files.push(full);
    }
  }
  return files;
}

let hasError = false;
const scssFiles = findScssFiles(ROOT);

for (const file of scssFiles) {
  /* eslint-disable security/detect-non-literal-fs-filename -- file from findScssFiles */
  const content = fs.readFileSync(file, "utf8");
  /* eslint-enable security/detect-non-literal-fs-filename */
  const relative = path.relative(ROOT, file);
  for (const { pattern, correct } of BAD_PATTERNS) {
    const matches = content.match(pattern);
    if (matches) {
      hasError = true;
      console.error(
        `${relative}: use "${correct}" (Sass is case-sensitive). Found: ${matches.join(", ")}`
      );
    }
  }
}

if (hasError) {
  console.error(
    "\nFix: replace lowercase function names with exact casing (see styles/abstracts/_mixins.scss)."
  );
  process.exit(1);
}
