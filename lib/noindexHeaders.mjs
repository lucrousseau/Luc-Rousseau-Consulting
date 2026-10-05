/**
 * Pages and files that are public but must stay out of search results.
 *
 * Why a header and not robots.txt: a `Disallow` stops crawlers from fetching the URL, so
 * they never see the noindex, and the URL can still be indexed from an inbound link.
 * `X-Robots-Tag` also covers files (SVG, PNG) that cannot carry a meta robots tag.
 * Keep these paths out of robots.txt, the sitemap, the navigation and the footer.
 */
export const NOINDEX_HEADER = { key: "X-Robots-Tag", value: "noindex, nofollow" };

/**
 * Media kit: the page and every downloadable file under it.
 * No `locale: false`: Next's i18n then matches each source with and without a locale
 * prefix (/media-kit, /en/media-kit, /fr/media-kit). With `locale: false` the files under
 * public/ lost the header in a measured run, because Next matches them after adding the
 * default locale internally.
 */
export const NOINDEX_SOURCES = ["/media-kit", "/media-kit/:path*"];

export const noindexHeaderRules = NOINDEX_SOURCES.map((source) => ({
  source,
  headers: [NOINDEX_HEADER],
}));
