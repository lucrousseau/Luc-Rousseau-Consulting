/**
 * Path for SEO URLs: default locale has no prefix (`/`), others use `/${locale}`.
 * @param {string} locale
 * @param {string} defaultLocale
 * @param {string} pathname
 * @returns {string}
 */
export function localizedPath(locale, defaultLocale, pathname) {
  const p = pathname && pathname !== "" ? pathname : "/";
  if (locale === defaultLocale) {
    return p;
  }
  return p === "/" ? `/${locale}` : `/${locale}${p}`;
}

/**
 * @param {string} base - Origin without trailing slash
 * @param {string} path
 * @returns {string}
 */
export function absoluteUrl(base, path) {
  return path === "/" ? `${base}/` : `${base}${path}`;
}

/**
 * Absolute URL with locale prefix for SEO (canonical, hreflang, sitemap, JSON-LD).
 * @param {string} base - Origin without trailing slash
 * @param {string} locale
 * @param {string} defaultLocale
 * @param {string} pathname - Path without locale prefix (e.g. `/situations/foo`)
 * @returns {string}
 */
export function localizedAbsoluteUrl(base, locale, defaultLocale, pathname) {
  return absoluteUrl(base, localizedPath(locale, defaultLocale, pathname));
}
