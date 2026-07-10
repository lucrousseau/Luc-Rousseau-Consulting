import classNames from "classnames";
import type { ReactNode } from "react";

import { alignments, type AlignmentProps } from "../../commons/alignments";

type TagItem = {
  content: ReactNode;
  emoji?: string;
};

type TagsProps = AlignmentProps & {
  className?: string;
  items: TagItem[];
};

export default function Tags({ className, items, ...props }: TagsProps) {
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
