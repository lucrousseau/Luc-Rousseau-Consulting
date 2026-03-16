import classNames from "classnames";

import { alignments } from "../../../commons/alignments";

import "./style.scss";

const column = (item, index) => {
  const { className, tag = "div", cols = {}, auto, pull, style, content } = item;

  const colClasses = !auto
    ? Object.entries(cols).map(([key, value]) => {
        const prefix = key === "col" ? "" : `${key}-`;
        if (value !== undefined && value !== null) return `col--${prefix}${value}`;
      })
    : [];

  const Tag = tag;
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
}) {
  const Tag = tag;
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
      {columns.map(column)}
    </Tag>
  );
}
