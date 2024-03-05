import classNames from "classnames";

import { alignments } from "../../commons/alignments";

import "./style.scss";

export default function Logo({ ...props }) {
  const alignmentsClass = alignments({ props });

  return (
    <div className={classNames("component component__logo", alignmentsClass)}>
      <a
        href="/"
        className="h2 logo"
        aria-label="Luc Rousseau | CTO à la Demande & Création de Produits"
      >
        <span>Luc Rousseau</span>
      </a>
    </div>
  );
}
