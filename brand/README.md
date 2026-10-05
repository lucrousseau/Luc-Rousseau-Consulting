# Marque Luc Rousseau Consulting

Les sources de la marque, versionnées avec le site. Approuvées par Luc le 5 octobre 2026 : la charte dans TK-397, le symbole dans TK-398.

## Le symbole

Une chaîne fermée de trois maillons, l'architecture, le cap produit et le code : « je suis à moi seul la chaîne ». Variante A6 : sans entrelacs, un jour net entre les maillons, égal à 1,2 fois le trait.

## Règles d'usage

- **Le SVG fait foi.** Le maître est `symbole/lrc-symbole.svg` ; les PNG en sont dérivés et ne se retouchent jamais.
- **Tout marine**, sans point, sans entrelacs. Sur fond marine, la version craie `symbole/lrc-symbole-blanc.svg`.
- **Jamais de corail** dans la marque : il ne sert qu'à l'alerte de dépassement du calculateur.
- À 16 et 32 px, on emploie les dessins propres à ces tailles (`lrc-symbole-16.svg`, `lrc-symbole-32.svg`), pas une réduction du maître.

## Palette

| Nom     | Hex       | Rôle                                                             |
| ------- | --------- | ---------------------------------------------------------------- |
| Marine  | `#131E61` | Titres, logo, symbole                                            |
| Ardoise | `#454C73` | Texte courant, intertitres H3, boutons secondaires               |
| Vert    | `#4A6359` | Liens, bouton principal, filet sous les H2 (`#3D5249` au survol) |
| Craie   | `#F6F5F5` | Fond de page, fond des icônes opaques                            |
| Blanc   | `#FFFFFF` | Cartes                                                           |
| Corail  | `#EE6F57` | Alerte du calculateur seulement, hors rôle de marque             |

## Typographie

- Titres : Quincy CF Black (H1 52 px, 44 en mobile ; H2 36 px, 32 en mobile ; logo 36 px).
- Intertitres H3 : Quincy CF Medium, 24 px.
- Texte : police système, 16 px, interligne 1,8.

Les fichiers de Quincy CF vivent dans `public/fonts/` pour le site ; ils ne font pas partie du kit et ne se redistribuent pas.

## Contenu

- `symbole/` : les SVG (maître, craie, 16, 32, et les sources des icônes et de l'avatar), `generer.py` qui les produit, et `symbole-lrc-final.png`, la planche approuvée.
- `png/` : PNG et `favicon.ico` générés à partir des SVG.
- `charte/` : `charte-lrc-v1.0.png` et sa source HTML (elle charge Quincy CF depuis `public/fonts/`).

## Version publique

La page [lucrousseau.com/media-kit](https://lucrousseau.com/media-kit) (et `/en/media-kit`) propose au téléchargement les fichiers listés dans `commons/mediaKit.json`, copiés par `npm run brand` dans `public/media-kit/`. Ni ce README, ni les scripts, ni les sources des icônes n'y sont publiés.

La page et ses fichiers sont publics mais **non indexables** : en-tête `X-Robots-Tag: noindex, nofollow` (`lib/noindexHeaders.mjs`), balise `robots` sur la page, absence du sitemap, aucun lien depuis la navigation ni le pied de page. Ils ne sont **pas** bloqués dans robots.txt : un `Disallow` empêcherait les moteurs de lire le noindex.

## Régénérer

```bash
python3 brand/symbole/generer.py   # seulement si la géométrie change : réécrit les SVG
npm run brand                      # rend brand/png/, les icônes du site et public/media-kit/
```

Committer les SVG et tout ce que `npm run brand` a réécrit dans le même commit. Le test `__tests__/brand-assets.test.ts` échoue si un PNG ne correspond plus à son SVG.
