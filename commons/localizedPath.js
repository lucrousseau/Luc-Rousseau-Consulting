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
