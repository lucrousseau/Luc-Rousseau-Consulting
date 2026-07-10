import classNames from "classnames";
import type { ReactNode } from "react";

import { alignments, type AlignmentProps } from "../../commons/alignments";

import Buy from "../Buy";

type ProductProps = AlignmentProps & {
  className?: string;
  children?: ReactNode;
  title?: ReactNode;
  price?: number;
  legend?: ReactNode;
  label?: string;
};

export default function Product({
  className,
  children,
  title,
  price,
  legend,
  label,
  ...props
}: ProductProps) {
  const alignmentsClass = alignments({ props });
  const hasNoLabel = label ? false : true;

  return (
    <div
      className={classNames("component component__product", className, alignmentsClass, {
        "component__product--has-nolabel": hasNoLabel,
      })}
    >
      <h3>{title}</h3>
      {children}
      {!hasNoLabel && (
        <Buy price={price} legend={legend} label={label} className={"align--lg-right"} />
      )}
    </div>
  );
}
