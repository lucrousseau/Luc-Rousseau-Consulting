import classNames from "classnames";
import type { CSSProperties, ReactNode } from "react";

import Row from "../Layout/Row";
import { parseHtmlContent } from "../../commons/parseHtmlContent";
import { homeTableRowStyle } from "../../commons/pageRowSpacing";

const DEFAULT_COLS = { col: 10, sm: 12 };

type NumberedHighlightItem = {
  title: string;
  content?: string | ReactNode;
};

type NumberedHighlightListProps = {
  items: NumberedHighlightItem[];
  startIndex?: number;
  className?: string;
  cols?: Record<string, number | string>;
  rowStyle?: CSSProperties;
  wrapRow?: boolean;
};

/**
 * Numbered vertical highlight list (design system). Use instead of ProductGrid when
 * items should read as a sequence, not a card grid.
 */
export default function NumberedHighlightList({
  items,
  startIndex = 1,
  className,
  cols = DEFAULT_COLS,
  rowStyle = homeTableRowStyle,
  wrapRow = true,
}: NumberedHighlightListProps) {
  if (!Array.isArray(items) || items.length === 0) {
    return null;
  }

  const list = (
    <ol className={classNames("component__numbered-highlight-list__list", "align", "align--left")}>
      {items.map((item, index) => (
        <li key={item.title} className="component__numbered-highlight-list__item">
          <span className="component__numbered-highlight-list__index" aria-hidden="true">
            {startIndex + index}
          </span>
          <div className="component__numbered-highlight-list__body">
            <h3 className="h4 component__numbered-highlight-list__title">{item.title}</h3>
            <div className="component__numbered-highlight-list__content">
              {parseHtmlContent(item.content)}
            </div>
          </div>
        </li>
      ))}
    </ol>
  );

  if (!wrapRow) {
    return (
      <div className={classNames("component", "component__numbered-highlight-list", className)}>
        {list}
      </div>
    );
  }

  return (
    <div className={classNames("component", "component__numbered-highlight-list", className)}>
      <Row
        halign="center"
        style={rowStyle}
        columns={[
          {
            cols,
            content: list,
          },
        ]}
      />
    </div>
  );
}
