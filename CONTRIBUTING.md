# Contributing

## Scripts

Run the full check suite before pushing (also enforced by the `pre-push` Husky hook):

```bash
npm run validate
```

## UI conventions (DRY)

Schedule CTAs (Calendly + LinkedIn / email alternates) must go through:

- [`components/SectionCta`](components/SectionCta/index.js) for section footers
- [`components/Buy`](components/Buy/index.js) for pricing/legend blocks (hero, product cards)

Do not place adjacent `Button` + `ContactAlternates` in `sections/` or new components; extend `SectionCta` or `Buy` instead.

## Copywriting (locales)

Avoid the em dash (`—`, U+2014) in `public/locales/` and other user-facing copy. Prefer commas, colons, parentheses, or a pipe in SEO titles. See `.cursor/rules/copywriting-no-em-dash.mdc`.
