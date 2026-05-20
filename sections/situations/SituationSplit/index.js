import Row from "../../../components/Layout/Row";
import { parseHtmlContent } from "../../../commons/parseHtmlContent";
import TermsTwoColumn from "../../../components/TermsTwoColumn";
import { homeIntroRowStyle } from "../../../commons/pageRowSpacing";

/**
 * Two-column situation block (engagement-style terms layout).
 * @param {object} props.block i18n split block (title, intro, columnsLabel, panels)
 */
export default function SituationSplit({ block }) {
  const panels = block?.panels;
  if (!Array.isArray(panels) || panels.length < 2) {
    return null;
  }

  const columns = panels.map((panel) => ({
    heading: panel.heading ?? panel.title ?? "",
    lede: panel.lede,
    items: panel.items,
  }));

  const showHeader = Boolean(block.title || block.intro || block.columnsLabel);

  return (
    <Row
      halign="center"
      style={homeIntroRowStyle}
      columns={[
        {
          cols: { col: 10, sm: 12 },
          content: (
            <div className="situation-split">
              {showHeader && (
                <header className="situation-split__header align align--center">
                  {block.title != null && block.title !== "" && (
                    <h3 className="h3 underline underline--center situation-split__title">
                      {block.title}
                    </h3>
                  )}
                  {block.intro ? parseHtmlContent(block.intro) : null}
                  {block.columnsLabel != null && block.columnsLabel !== "" && (
                    <h4 className="h4 situation-split__columns-label">{block.columnsLabel}</h4>
                  )}
                </header>
              )}
              <TermsTwoColumn className="situation-split__terms" columns={columns} />
            </div>
          ),
        },
      ]}
    />
  );
}
