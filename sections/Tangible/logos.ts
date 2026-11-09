import type { StaticImageData } from "next/image";

import milesopediaLogo from "./images/milesopedia.png";
import nestoLogo from "./images/nesto.png";
import comparemortgageLogo from "./images/comparemortgage.png";
import nestogroupLogo from "./images/nestogroup.png";
import builderHelperLogo from "./images/builder-helper.svg";

/**
 * Logos keyed by the stable `id` of each `tangible.json` item, not by position: a case added
 * at the top must not shift every logo down. An id without an entry renders without a logo.
 */
export const PROJECT_LOGOS: Readonly<Record<string, StaticImageData>> = {
  "builder-helper": builderHelperLogo,
  milesopedia: milesopediaLogo,
  nesto: nestoLogo,
  "mon-meilleur-taux": comparemortgageLogo,
  brightwize: nestogroupLogo,
};
