/**
 * True for private CV pages (/cvs and /cvs/*).
 * @param {string} [pathname] - Next.js router pathname (no locale prefix)
 */
export function isCvPath(pathname = "") {
  return pathname === "/cvs" || pathname.startsWith("/cvs/");
}
