/**
 * Default Open Graph image path by locale.
 * @param {string} locale
 * @returns {string}
 */
export function getDefaultOgImage(locale) {
  return locale === "fr" ? "/og/image-fr.jpg" : "/og/image-en.jpg";
}
