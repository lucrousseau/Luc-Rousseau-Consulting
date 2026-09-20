@AGENTS.md

## Claude Code

Tu codes dans le dépôt **lucrousseau.com** (Next.js Pages Router). Ce n’est pas lucrousseau.ca (WordPress photographe) et ce n’est pas ellr.

- Suit `AGENTS.md`. Ne le duplique pas ici.
- Identité publique : lis `commons/llmSignal.ts`, ne la réécris pas de mémoire.
- Outillage : voie officielle Next.js / Vercel. Pas de plugin hébergeur « déjà là ».
- Preuve HTML (meta, CSP, script) : `curl -sI` ou `curl -s`, pas WebFetch.
- Ne commite, ne pousse, ne merge, ne déploie que si Luc le demande dans la session.
- `npm run validate` avant de dire que c’est fini. UI : navigateur, FR + EN.
- Pour une nouvelle section : maquette (structure + note de direction courte) avant le code, sauf si Luc a fusionné les deux dans la même demande.
