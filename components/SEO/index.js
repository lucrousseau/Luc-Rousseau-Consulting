import Head from "next/head";
import { useRouter } from "next/router";

import { getDefaultOgImage } from "../../commons/defaultOgImage";
import { GEO_LOCATION, geoCoordinatesJsonLd, postalAddressJsonLd } from "../../commons/geoLocation";
import { absoluteUrl, localizedPath } from "../../commons/localizedPath";
import { getHomeSeoCopy } from "../../commons/sitePositioning";
import { getSiteOrigin } from "../../utils/siteOrigin";

const SITE_NAME = "Luc Rousseau";
const PERSON_ID_SUFFIX = "#person";
const SERVICE_ID_SUFFIX = "#service";

const SEO = ({
  title,
  description,
  image,
  sameAs,
  jsonLd = [],
  path,
  hreflangPaths,
  noindex = false,
}) => {
  const base = getSiteOrigin();
  const router = useRouter();
  const { locale, pathname, asPath, defaultLocale } = router;
  const defaultLoc = defaultLocale ?? "fr";
  const pathOnly =
    path ??
    (pathname && !pathname.includes("[")
      ? pathname
      : (typeof asPath === "string" ? asPath.split("?")[0] : null) || pathname || "/");

  const canonicalPath = localizedPath(locale, defaultLoc, pathOnly);
  const canonical = absoluteUrl(base, canonicalPath);
  const siteHome = absoluteUrl(base, "/");

  const ogImagePath =
    typeof image === "string" && image.startsWith("/") ? image : getDefaultOgImage(locale);
  const ogImage = `${base}${ogImagePath}`;

  const ogLocale = locale === "fr" ? "fr_CA" : "en_CA";
  const ogLocaleAlternate = locale === "fr" ? "en_CA" : "fr_CA";
  const alternateEn = absoluteUrl(
    base,
    hreflangPaths?.en
      ? localizedPath("en", defaultLoc, hreflangPaths.en)
      : localizedPath("en", defaultLoc, pathOnly)
  );
  const alternateFr = absoluteUrl(
    base,
    hreflangPaths?.fr
      ? localizedPath("fr", defaultLoc, hreflangPaths.fr)
      : localizedPath("fr", defaultLoc, pathOnly)
  );
  const alternateDefault = absoluteUrl(
    base,
    hreflangPaths?.default
      ? localizedPath(defaultLoc, defaultLoc, hreflangPaths.default)
      : localizedPath(defaultLoc, defaultLoc, pathOnly)
  );

  const homeSeoCopy = getHomeSeoCopy(locale);
  const personId = `${siteHome}${PERSON_ID_SUFFIX}`;
  const serviceId = `${siteHome}${SERVICE_ID_SUFFIX}`;

  const jsonLdPerson =
    sameAs && sameAs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "Person",
          "@id": personId,
          name: SITE_NAME,
          url: siteHome,
          sameAs: sameAs,
          jobTitle: homeSeoCopy.jobTitle,
          address: postalAddressJsonLd(),
          geo: geoCoordinatesJsonLd(),
          areaServed: [
            { "@type": "AdministrativeArea", name: "Quebec" },
            { "@type": "Country", name: "Canada" },
          ],
        }
      : null;

  const jsonLdProfessionalService =
    sameAs && sameAs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          "@id": serviceId,
          name: "Luc Rousseau Consulting",
          url: siteHome,
          description: homeSeoCopy.description,
          provider: { "@id": personId },
          address: postalAddressJsonLd(),
          geo: geoCoordinatesJsonLd(),
          areaServed: [
            { "@type": "City", name: GEO_LOCATION.locality },
            { "@type": "AdministrativeArea", name: "Quebec" },
            { "@type": "Country", name: "Canada" },
          ],
          availableLanguage: ["fr-CA", "en-CA"],
          serviceType:
            locale === "fr"
              ? [
                  "Consultant produit et développeur senior",
                  "Architecture technique",
                  "Mandat fractionnel produit-tech",
                ]
              : [
                  "Product engineering",
                  "Technical architecture",
                  "Fractional product-tech consulting",
                ],
        }
      : null;

  const jsonLdWebSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: siteHome,
    description: homeSeoCopy.description,
    inLanguage: [locale === "fr" ? "fr-CA" : "en-CA"],
    areaServed: [
      {
        "@type": "Country",
        name: "Canada",
      },
      {
        "@type": "AdministrativeArea",
        name: "Quebec",
      },
      {
        "@type": "City",
        name: GEO_LOCATION.locality,
      },
    ],
  };

  const extraSchemas = Array.isArray(jsonLd) ? jsonLd.filter(Boolean) : [];

  return (
    <Head>
      <title>{title}</title>
      {jsonLdPerson && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson) }}
        />
      )}
      {jsonLdProfessionalService && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdProfessionalService) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
      />
      {extraSchemas.map((schema, index) => (
        <script
          key={`jsonld-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <meta name="description" content={description} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      <link rel="canonical" href={canonical} />

      <meta name="geo.region" content={GEO_LOCATION.regionMeta} />
      <meta name="geo.placename" content={GEO_LOCATION.placename} />
      <meta name="geo.position" content={`${GEO_LOCATION.latitude};${GEO_LOCATION.longitude}`} />
      <meta name="ICBM" content={`${GEO_LOCATION.latitude}, ${GEO_LOCATION.longitude}`} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonical} />
      <meta property="og:locale" content={ogLocale} />
      <meta property="og:locale:alternate" content={ogLocaleAlternate} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      <link rel="alternate" hrefLang="en" href={alternateEn} />
      <link rel="alternate" hrefLang="fr" href={alternateFr} />
      <link rel="alternate" hrefLang="x-default" href={alternateDefault} />

      <link rel="apple-touch-icon" sizes="180x180" href={`${base}/favicon/apple-touch-icon.png`} />
      <link rel="icon" type="image/png" sizes="32x32" href={`${base}/favicon/favicon-32x32.png`} />
      <link rel="icon" type="image/png" sizes="16x16" href={`${base}/favicon/favicon-16x16.png`} />
      <link rel="manifest" href={`${base}/favicon/site.webmanifest`} />
    </Head>
  );
};

export default SEO;
