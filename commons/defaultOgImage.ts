/** Default Open Graph image path by locale. */
export function getDefaultOgImage(locale: string): string {
  return locale === "fr" ? "/og/image-fr.jpg" : "/og/image-en.jpg";
}
