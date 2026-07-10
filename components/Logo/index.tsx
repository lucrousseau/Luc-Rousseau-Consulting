import classNames from "classnames";
import Link from "next/link";

import { alignments, type AlignmentProps } from "../../commons/alignments";

export default function Logo({ ...props }: AlignmentProps) {
  const alignmentsClass = alignments({ props });

  return (
    <div className={classNames("component component__logo", alignmentsClass)}>
      <Link
        href="/"
        className="h2 logo"
        aria-label="Luc Rousseau | CTO à la Demande & Création de Produits"
      >
        <span>Luc Rousseau</span>
      </Link>
    </div>
  );
}
