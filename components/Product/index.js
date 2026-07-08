import classNames from "classnames";

import { alignments } from "../../commons/alignments";

import Buy from "../Buy";

/**
 * @param {object} props
 * @param {string} [props.className]
 * @param {import('react').ReactNode} [props.children]
 * @param {import('react').ReactNode} [props.title]
 * @param {number} [props.price]
 * @param {import('react').ReactNode} [props.legend]
 * @param {string} [props.label]
 * @param {string} [props.align]
 * @param {string} [props.halign]
 * @param {string} [props.valign]
 */
export default function Product({ className, children, title, price, legend, label, ...props }) {
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
