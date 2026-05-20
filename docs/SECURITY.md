# Security

## HTML from locales

User-facing HTML is rendered with `parseHtmlContent` (`commons/parseHtmlContent.js`), which reads strings from `public/locales/` only. Do not pass untrusted or CMS-sourced HTML through `html-react-parser` without sanitization.

External links get `rel="noopener noreferrer"` and `target="_blank"` by default.

## HTTP headers

Security headers (including CSP) are defined in `lib/securityHeaders.mjs` and applied in `next.config.mjs`. Home routes `/` and `/en` include the same headers plus `Cache-Control`.

## API routes

- `utils/apiRequireGet.js`: only GET/HEAD.
- `utils/siteOrigin.js`: Host allowlist for sitemap, robots, and llms.txt.

## Dependencies

Run `npm run audit` and `npm run audit:fix` regularly. Keep `next` at a patched 15.5.x release.

## ESLint

`eslint-plugin-security` is enabled via `.eslintrc.json`.
