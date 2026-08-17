/** Webpack/Turbopack loader that replaces Next.js `polyfill-module` with a no-op. */
module.exports = function emptyPolyfillLoader() {
  return "/* empty: browserslist already covers these APIs */";
};
