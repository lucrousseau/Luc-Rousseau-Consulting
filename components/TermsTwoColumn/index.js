import classNames from "classnames";
import { parseHtmlContent } from "../../commons/parseHtmlContent";

/**
 * Two-column terms layout (home engagement « Sur le papier », situation split blocks).
 * @param {object} props
 * @param {{ heading?: string; title?: string; lede?: string; items?: string[] }[]} props.columns
 * @param {string} [props.className]
 */
export default function TermsTwoColumn({ columns, className }) {
  if (!Array.isArray(columns) || columns.length < 2) {
    return null;
  }

  return (
    <div className={classNames("terms-two-column", "align", "align--left", className)}>
      <div className="terms-two-column__columns">
        {columns.map((column) => {
          const items = Array.isArray(column.items) ? column.items : [];
          const heading = column.heading ?? column.title ?? "";
          return (
            <div key={heading} className="terms-two-column__column">
              {heading !== "" && <h4 className="h4 terms-two-column__heading">{heading}</h4>}
              {column.lede ? parseHtmlContent(column.lede) : null}
              {items.length > 0 && (
                <ul className="terms-two-column__ul">
                  {items.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
