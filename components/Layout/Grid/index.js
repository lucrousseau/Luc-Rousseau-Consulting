import classNames from "classnames";

import { alignments } from "../../../commons/alignments";

import "./style.scss";

const cells = (item, index) => {
  const { className, tag = "div", cols = {}, rows = {}, style, content } = item;

  const colClasses = Object.entries(cols).map(([key, value]) => {
    const prefix = key === "col" ? "" : `${key}-`;
    if (value) return `col--${prefix}${value}`;
  });

  const rowClasses = Object.entries(rows).map(([key, value]) => {
    const prefix = key === "row" ? "" : `${key}-`;
    if (value) return `col--${prefix}cell-${value}`;
  });

  const Tag = tag;
  const alignmentsClass = alignments({ prefix: "col", props: item });

  return (
    <Tag
      key={index}
      className={classNames(
        "col",
        className,
        ...colClasses,
        ...rowClasses,
        alignmentsClass
      )}
      style={style}
    >
      {content}
    </Tag>
  );
};

export default function Grid({ className, template = [], style, ...props }) {
  const alignmentsClass = alignments({ props });

  return (
    <div
      className={classNames("grid", className, alignmentsClass)}
      style={style}
    >
      {template.map(cells)}
    </div>
  );
}
