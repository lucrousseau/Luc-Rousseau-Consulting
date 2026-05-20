import parse from "html-react-parser";

import Row from "../../../components/Layout/Row";
import { homeTableRowStyle } from "../../../commons/pageRowSpacing";

/**
 * Vertical numbered highlights for situation pages (not ProductGrid boxes).
 * @param {{ items?: { title: string; content: string }[] }} props
 */
export default function SituationHighlights({ items }) {
  if (!Array.isArray(items) || items.length === 0) {
    return null;
  }

  return (
    <Row
      halign="center"
      style={homeTableRowStyle}
      columns={[
        {
          cols: { col: 10, sm: 12 },
          content: (
            <ol className="situation-highlights__list align align--left">
              {items.map((item, index) => (
                <li key={item.title} className="situation-highlights__item">
                  <span className="situation-highlights__index" aria-hidden="true">
                    {index + 1}
                  </span>
                  <div className="situation-highlights__body">
                    <h3 className="h4 situation-highlights__title">{item.title}</h3>
                    <div className="situation-highlights__content">{parse(item.content)}</div>
                  </div>
                </li>
              ))}
            </ol>
          ),
        },
      ]}
    />
  );
}
