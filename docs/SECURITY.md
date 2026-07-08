# Security

## HTML from locales

User-facing HTML is rendered with `parseHtmlContent` (`commons/parseHtmlContent.js`), which reads strings from `public/locales/` only. Do not pass untrusted or CMS-sourced HTML through `html-react-parser` without sanitization.

External links get `rel="noopener noreferrer"` and `target="_blank"` by default.

Situation and expertise SEO JSON is loaded from static locale files allowlisted in `commons/situationSeoMeta.js` (manifest-driven `require()` paths, no runtime path assembly).

## HTTP headers

Security headers (including CSP) are defined in `lib/securityHeaders.mjs` and applied in `next.config.mjs`. Home routes `/` and `/en` include the same headers plus `Cache-Control`.

## API routes

- `utils/apiRequireGet.js`: only GET/HEAD.
- `utils/siteOrigin.js`: Host allowlist for sitemap, robots, llms.txt, llms-full.txt, and humans.txt.

## Dependencies

Run `npm run audit` and `npm run audit:fix` regularly. Keep `next` on a patched 16.2.x release (or newer stable).

Known transitive advisory: Next.js may bundle PostCSS below 8.5.10 until a patched Next release; do not run `npm audit fix --force` (it can downgrade Next).

## ESLint

`eslint-plugin-security` is enabled via `eslint.config.mjs` (flat config). Test files are excluded from the noisiest security rules; production code in `commons/` is kept clean.
