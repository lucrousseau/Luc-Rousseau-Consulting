import classNames from "classnames";

import { alignments } from "../../commons/alignments";

import Button from "../Button";

import "./style.scss";

export default function Buy({ className, price, legend, label, ...props }) {
  const alignmentsClass = alignments({ props });

  return (
    <div
      className={classNames(
        "component component__buy",
        className,
        alignmentsClass
      )}
      data-price={price}
    >
      <span>{legend}</span>
      <Button variant={"secondary"} size={"small"} href={"#"} label={label} />
    </div>
  );
}
