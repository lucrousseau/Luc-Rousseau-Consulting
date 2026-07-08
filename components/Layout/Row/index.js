import classNames from "classnames";

import { alignments } from "../../../commons/alignments";

/**
 * @typedef {object} RowColumn
 * @property {import('react').ReactNode} [content]
 * @property {Record<string, number | string>} [cols]
 * @property {string} [tag]
 * @property {string} [className]
 * @property {boolean} [auto]
 * @property {string | number} [pull]
 * @property {import('react').CSSProperties} [style]
 * @property {string} [align]
 * @property {string} [halign]
 * @property {string} [valign]
 */

/**
 * @param {RowColumn} item
 * @param {number} index
 */
const column = (item, index) => {
  const { className, tag = "div", cols = {}, auto, pull, style, content } = item;

  const colClasses = !auto
    ? Object.entries(cols).map(([key, value]) => {
        const prefix = key === "col" ? "" : `${key}-`;
        if (value !== undefined && value !== null) return `col--${prefix}${value}`;
      })
    : [];

  const Tag = /** @type {import('react').ElementType} */ (tag);
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

/**
 * @param {object} props
 * @param {string} [props.id]
 * @param {import('react').ReactNode} [props.children]
 * @param {string} [props.className]
 * @param {(RowColumn | false | null | undefined)[]} [props.columns]
 * @param {string} [props.tag]
 * @param {string[]} [props.reverse]
 * @param {boolean} [props.nowrap]
 * @param {boolean} [props.inline]
 * @param {import('react').CSSProperties} [props.style]
 * @param {string} [props.align]
 * @param {string} [props.halign]
 * @param {string} [props.valign]
 */
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
  const Tag = /** @type {import('react').ElementType} */ (tag);
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
      {/** @type {RowColumn[]} */ (columns.filter(Boolean)).map(column)}
    </Tag>
  );
}
