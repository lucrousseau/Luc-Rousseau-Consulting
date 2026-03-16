/**
 * In development, clear next-i18next's server-side cache so locale JSON changes
 * are picked up without restarting the dev server. The createClient (node) module
 * keeps a globalInstance that caches translations; invalidating it forces a fresh
 * load from disk on the next request.
 */
function clearI18nServerCache() {
  if (process.env.NODE_ENV !== "development") return;
  try {
    const path = require("path");
    const createClientPath = path.join(
      process.cwd(),
      "node_modules",
      "next-i18next",
      "dist",
      "commonjs",
      "createClient",
      "node.js"
    );
    const resolved = require.resolve(createClientPath);
    /* eslint-disable security/detect-object-injection -- resolved is from require.resolve, not user input */
    if (resolved && require.cache[resolved]) {
      delete require.cache[resolved];
    }
    /* eslint-enable security/detect-object-injection */
  } catch {
    // Ignore if path or cache clear fails
  }
}

module.exports = { clearI18nServerCache };
