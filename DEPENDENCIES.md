# Dépendances — versions et mises à jour

Dernière mise à jour : mars 2025.

## Versions principales (alignées sur les dernières stables compatibles)

| Package                   | Avant  | Après       | Note                                                                                                           |
| ------------------------- | ------ | ----------- | -------------------------------------------------------------------------------------------------------------- |
| **next**                  | 14.2.x | **15.5.12** | Next 15 : cache par défaut désactivé, APIs async (params, headers, etc. en App Router). Pages Router inchangé. |
| **react** / **react-dom** | ^18    | **18.3.1**  | Dernière majeure 18.x. React 19 disponible mais optionnel.                                                     |
| **next-i18next**          | 15.3.x | **15.4.3**  | Compatible Next 15 + Pages Router.                                                                             |
| **eslint-config-next**    | 14.2.x | **15.5.12** | Aligné sur Next 15.                                                                                            |
| **@next/bundle-analyzer** | 14.2.x | **15.5.12** | Aligné sur Next 15.                                                                                            |
| **tailwindcss**           | 3.4.3  | **3.4.19**  | Dernière 3.x. Tailwind 4 = migration majeure (config, CSS).                                                    |
| **sass**                  | 1.77.x | **1.97.3**  | Patch / mineur.                                                                                                |

## Non mis à jour volontairement (risque de breaking)

- **Tailwind 4** : config et syntaxe différentes, migration dédiée.
- **React 19** : possible avec Next 15, mais à tester (hooks, comportements).
- **Next 16** : disponible ; migration depuis 15 à prévoir séparément.
- **ESLint 9/10** : `eslint-config-next` gère la version ; pas de passage forcé à ESLint 10.

## Commandes utiles

```bash
# Voir les paquets obsolètes
npm outdated

# Mettre à jour tous les patch/mineur dans les plages ^
npm update

# Réinstaller après modification du package.json
npm install
```
