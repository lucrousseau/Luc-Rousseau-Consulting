import classNames from "classnames";

import { alignments } from "../../commons/alignments";

/**
 * @param {object} props
 * @param {string} [props.className]
 * @param {{ content: import('react').ReactNode; emoji?: string }[]} props.items
 * @param {string} [props.align]
 * @param {string} [props.halign]
 * @param {string} [props.valign]
 */
export default function Tags({ className, items, ...props }) {
  const alignmentsClass = alignments({ props });

  return (
    <div className={classNames("row component component__tags", className, alignmentsClass)}>
      {items.map((item, index) => (
        <strong key={index}>
          {item.content}
          {item.emoji != null && item.emoji !== "" ? <i> {item.emoji}</i> : null}
        </strong>
      ))}
    </div>
  );
}
