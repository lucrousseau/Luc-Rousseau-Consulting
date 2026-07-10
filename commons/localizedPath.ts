/** Path for SEO URLs: default locale has no prefix (`/`), others use `/${locale}`. */
export function localizedPath(locale: string, defaultLocale: string, pathname: string): string {
  const p = pathname && pathname !== "" ? pathname : "/";
  if (locale === defaultLocale) {
    return p;
  }
  return p === "/" ? `/${locale}` : `/${locale}${p}`;
}

export function absoluteUrl(base: string, path: string): string {
  return path === "/" ? `${base}/` : `${base}${path}`;
}

/** Absolute URL with locale prefix for SEO (canonical, hreflang, sitemap, JSON-LD). */
export function localizedAbsoluteUrl(
  base: string,
  locale: string,
  defaultLocale: string,
  pathname: string
): string {
  return absoluteUrl(base, localizedPath(locale, defaultLocale, pathname));
}
