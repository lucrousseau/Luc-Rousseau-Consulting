import classNames from "classnames";

import Row from "../Layout/Row";
import Button from "../Button";
import ContactAlternates from "../ContactAlternates";

function renderTeaser(teaser, teaserClassName) {
  if (teaser == null || teaser === false || teaser === "") {
    return null;
  }
  if (typeof teaser === "string") {
    return <p className={teaserClassName}>{teaser}</p>;
  }
  return teaser;
}

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
  showContactAlternates = true,
  wrapRow = true,
  wrapButtonInP = true,
  bare = false,
}) {
  const teaserNode = renderTeaser(teaser, teaserClassName);

  const button = <Button variant={variant} href={href} label={label} trackSection={trackSection} />;

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

  const column = { content: ctaContent };
  const resolvedCols = cols === undefined ? { col: 10, sm: 12 } : cols;
  if (resolvedCols != null) {
    column.cols = resolvedCols;
  }

  return <Row halign={halign || undefined} style={rowStyle} columns={[column]} />;
}
