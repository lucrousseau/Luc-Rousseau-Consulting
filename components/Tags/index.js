import classNames from "classnames";

import { alignments } from "../../commons/alignments";

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
