import classNames from "classnames";

import Row from "../Layout/Row";
import Button from "../Button";
import ContactAlternates from "../ContactAlternates";

/**
 * @param {import('react').ReactNode | string | false} teaser
 * @param {string} [teaserClassName]
 * @returns {import('react').ReactNode | null}
 */
function renderTeaser(teaser, teaserClassName) {
  if (teaser == null || teaser === false || teaser === "") {
    return null;
  }
  if (typeof teaser === "string") {
    return <p className={teaserClassName}>{teaser}</p>;
  }
  return teaser;
}

/**
 * @param {object} props
 * @param {string} [props.trackSection]
 * @param {string} [props.href]
 * @param {import('react').ReactNode} [props.label]
 * @param {import('react').ReactNode | string | false} [props.teaser]
 * @param {string} [props.teaserClassName]
 * @param {import('react').ReactNode} [props.beforeCTA]
 * @param {import('react').CSSProperties} [props.rowStyle]
 * @param {Record<string, number | string> | null} [props.cols]
 * @param {string} [props.halign]
 * @param {string} [props.className]
 * @param {string} [props.align]
 * @param {string} [props.variant]
 * @param {string | null} [props.size]
 * @param {boolean} [props.showContactAlternates]
 * @param {boolean} [props.wrapRow]
 * @param {boolean} [props.wrapButtonInP]
 * @param {boolean} [props.bare]
 */
export default function SectionCta({
  trackSection,
  href,
  label,
  teaser,
  teaserClassName,
  beforeCTA,
  rowStyle,
  cols,
  halign,
  className,
  align = "center",
  variant = "primary",
  size,
  showContactAlternates = true,
  wrapRow = true,
  wrapButtonInP = true,
  bare = false,
}) {
  const teaserNode = renderTeaser(teaser, teaserClassName);

  const button = (
    <Button variant={variant} size={size} href={href} label={label} trackSection={trackSection} />
  );

  const ctaContent = bare ? (
    <>
      {beforeCTA}
      {teaserNode}
      {wrapButtonInP ? <p>{button}</p> : button}
      {showContactAlternates && <ContactAlternates trackSection={trackSection} />}
    </>
  ) : (
    <div className={classNames(align && `align align--${align}`, className)}>
      {beforeCTA}
      {teaserNode}
      {wrapButtonInP ? <p>{button}</p> : button}
      {showContactAlternates && <ContactAlternates trackSection={trackSection} />}
    </div>
  );

  if (!wrapRow) {
    return ctaContent;
  }

  /** @type {{ content: import('react').ReactNode; cols?: Record<string, number | string> }} */
  const column = { content: ctaContent };
  const resolvedCols = cols === undefined ? { col: 10, sm: 12 } : cols;
  if (resolvedCols != null) {
    column.cols = resolvedCols;
  }

  return <Row halign={halign || undefined} style={rowStyle} columns={[column]} />;
}
