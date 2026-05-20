import Head from "next/head";
import { useRouter } from "next/router";

import { getSiteOrigin } from "../../utils/siteOrigin";

const SITE_NAME = "Luc Rousseau";

/** Path for SEO URLs: default locale has no prefix (`/`), others use `/${locale}`. */
function localizedPath(locale, defaultLocale, pathname) {
  const p = pathname && pathname !== "" ? pathname : "/";
  if (locale === defaultLocale) {
    return p;
  }
  return p === "/" ? `/${locale}` : `/${locale}${p}`;
}

const SEO = ({ title, description, image, sameAs }) => {
  const base = getSiteOrigin();
  const router = useRouter();
  const { locale, pathname, defaultLocale } = router;
  const defaultLoc = defaultLocale ?? "fr";
  const pathOnly = pathname || "/";

  const canonicalPath = localizedPath(locale, defaultLoc, pathOnly);
  const canonical = canonicalPath === "/" ? `${base}/` : `${base}${canonicalPath}`;

  const ogLocale = locale === "fr" ? "fr_CA" : "en_CA";
  const ogLocaleAlternate = locale === "fr" ? "en_CA" : "fr_CA";
  const alternateEn = `${base}${localizedPath("en", defaultLoc, pathOnly)}`;
  const alternateFr = `${base}${localizedPath("fr", defaultLoc, pathOnly)}`;
  const alternateDefault = `${base}${localizedPath(defaultLoc, defaultLoc, pathOnly)}`;

  // Person schema with location
  const jsonLdPerson =
    sameAs && sameAs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "Person",
          name: SITE_NAME,
          url: canonical,
          sameAs: sameAs,
          jobTitle:
            locale === "fr" ? "Consultant produit et développeur senior" : "Product Engineer",
          address: {
            "@type": "PostalAddress",
            addressRegion: "QC",
            addressCountry: "CA",
            addressLocality: "Montreal",
          },
        }
      : null;

  // WebSite schema for better site discovery
  const jsonLdWebSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: base,
    description:
      locale === "fr"
        ? "Consultant produit et développeur senior au Québec, Canada. Architecture produit et APIs, systèmes découpés, Laravel, WordPress headless quand l'édition l'exige, React/Vue. Systèmes à l'échelle."
        : "Product Engineer in Quebec, Canada. Product-facing architecture and APIs, decoupled systems, Laravel, WordPress headless when editorial scale demands it, React/Vue. Systems at scale.",
    inLanguage: [locale === "fr" ? "fr-CA" : "en-CA"],
    areaServed: [
      {
        "@type": "Country",
        name: "Canada",
      },
      {
        "@type": "State",
        name: "Quebec",
      },
      {
        "@type": "City",
        name: "Montreal",
      },
    ],
  };

  return (
    <Head>
      <title>{title}</title>
      {/* JSON-LD Schemas */}
      {jsonLdPerson && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
      />
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      {/* Geo-targeting meta tags */}
      <meta name="geo.region" content="CA-QC" />
      <meta name="geo.placename" content="Quebec, Montreal" />
      <meta name="geo.position" content="45.5017;-73.5673" />
      <meta name="ICBM" content="45.5017, -73.5673" />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${base}${image}`} />
      <meta property="og:url" content={canonical} />
      <meta property="og:locale" content={ogLocale} />
      <meta property="og:locale:alternate" content={ogLocaleAlternate} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${base}${image}`} />

      {/* Hreflang */}
      <link rel="alternate" hrefLang="en" href={alternateEn} />
      <link rel="alternate" hrefLang="fr" href={alternateFr} />
      <link rel="alternate" hrefLang="x-default" href={alternateDefault} />

      {/* Favicons */}
      <link rel="apple-touch-icon" sizes="180x180" href={`${base}/favicon/apple-touch-icon.png`} />
      <link rel="icon" type="image/png" sizes="32x32" href={`${base}/favicon/favicon-32x32.png`} />
      <link rel="icon" type="image/png" sizes="16x16" href={`${base}/favicon/favicon-16x16.png`} />
      <link rel="manifest" href={`${base}/favicon/site.webmanifest`} />
    </Head>
  );
};

export default SEO;
