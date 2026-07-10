/** Canonical business location (Quebec City). Used for geo meta tags and JSON-LD. */
export const GEO_LOCATION = Object.freeze({
  locality: "Quebec City",
  region: "QC",
  country: "CA",
  placename: "Quebec City, QC",
  regionMeta: "CA-QC",
  latitude: 46.8139,
  longitude: -71.208,
});

/**
 * @returns {{ "@type": "GeoCoordinates"; latitude: number; longitude: number }}
 */
export function geoCoordinatesJsonLd() {
  return {
    "@type": "GeoCoordinates",
    latitude: GEO_LOCATION.latitude,
    longitude: GEO_LOCATION.longitude,
  };
}

/**
 * @returns {{ "@type": "PostalAddress"; addressLocality: string; addressRegion: string; addressCountry: string }}
 */
export function postalAddressJsonLd() {
  return {
    "@type": "PostalAddress",
    addressLocality: GEO_LOCATION.locality,
    addressRegion: GEO_LOCATION.region,
    addressCountry: GEO_LOCATION.country,
  };
}
