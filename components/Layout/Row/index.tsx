import classNames from "classnames";
import type { CSSProperties, ElementType, ReactNode } from "react";

import { alignments } from "../../../commons/alignments";

export interface RowColumn {
  content?: ReactNode;
  cols?: Record<string, number | string>;
  tag?: string;
  className?: string;
  auto?: boolean;
  pull?: string | number;
  style?: CSSProperties;
  align?: string;
  halign?: string;
  valign?: string;
}

export interface RowProps {
  id?: string;
  children?: ReactNode;
  className?: string;
  columns?: (RowColumn | false | null | undefined)[];
  tag?: string;
  reverse?: string[];
  nowrap?: boolean;
  inline?: boolean;
  style?: CSSProperties;
  align?: string;
  halign?: string;
  valign?: string;
}

const column = (item: RowColumn, index: number) => {
  const { className, tag = "div", cols = {}, auto, pull, style, content } = item;

  const colClasses = !auto
    ? Object.entries(cols).map(([key, value]) => {
        const prefix = key === "col" ? "" : `${key}-`;
        if (value !== undefined && value !== null) return `col--${prefix}${value}`;
      })
    : [];

  const Tag = tag as ElementType;
  const pullClass = pull ? `col--pull-${pull}` : "";
  const alignmentsClass = alignments({ prefix: "col", props: item });

  return (
    <Tag
      key={index}
      className={classNames({ col: !auto }, className, ...colClasses, alignmentsClass, pullClass)}
      style={style}
    >
      {content}
    </Tag>
  );
};

export default function Row({
  id,
  children,
  className,
  columns = [],
  tag = "div",
  reverse,
  nowrap,
  inline,
  style,
  ...props
}: RowProps) {
  const Tag = tag as ElementType;
  const alignmentsClass = alignments({ prefix: "row", props });
  const reverseClass = reverse ? reverse.map((size) => `reverse--${size}`) : [];

  return (
    <Tag
      id={id}
      className={classNames("row", className, alignmentsClass, reverseClass, {
        "row--nowrap": nowrap,
        "row--inline": inline,
      })}
      style={style}
    >
      {(columns.filter(Boolean) as RowColumn[]).map(column)}
      {children}
    </Tag>
  );
}
