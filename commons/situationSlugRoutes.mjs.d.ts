declare module "./situationSlugRoutes.mjs" {
  export interface SituationSlugPair {
    slugFr: string;
    slugEn: string;
  }

  export const SITUATION_SLUG_PAIRS: readonly SituationSlugPair[];

  export function findSituationSlugPair(slug: string): SituationSlugPair | undefined;
}
