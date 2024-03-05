import classNames from "classnames";

import { alignments } from "../../commons/alignments";

import Buy from "../Buy";

import "./style.scss";

export default function Product({
  className,
  children,
  title,
  price,
  legend,
  label,
  ...props
}) {
  const alignmentsClass = alignments({ props });

  return (
    <div
      className={classNames(
        "component component__product",
        className,
        alignmentsClass
      )}
    >
      <h3 className="h4">{title}</h3>
      {children}
      <Buy
        price={price}
        legend={legend}
        label={label}
        className={"align--lg-right"}
      />
    </div>
  );
}
