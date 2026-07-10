import classNames from "classnames";
import type { CSSProperties, ReactNode } from "react";

import Row from "../Layout/Row";
import Button from "../Button";
import ContactAlternates from "../ContactAlternates";

function renderTeaser(
  teaser: ReactNode | string | false | null | undefined,
  teaserClassName?: string
): ReactNode | null {
  if (teaser == null || teaser === false || teaser === "") {
    return null;
  }
  if (typeof teaser === "string") {
    return <p className={teaserClassName}>{teaser}</p>;
  }
  return teaser;
}

export interface SectionCtaProps {
  trackSection?: string;
  href?: string;
  label?: ReactNode;
  teaser?: ReactNode | string | false;
  teaserClassName?: string;
  beforeCTA?: ReactNode;
  rowStyle?: CSSProperties;
  cols?: Record<string, number | string> | null;
  halign?: string;
  className?: string;
  align?: string;
  variant?: string;
  size?: string | null;
  showContactAlternates?: boolean;
  wrapRow?: boolean;
  wrapButtonInP?: boolean;
  bare?: boolean;
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
  size,
  showContactAlternates = true,
  wrapRow = true,
  wrapButtonInP = true,
  bare = false,
}: SectionCtaProps) {
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

  const column: { content: ReactNode; cols?: Record<string, number | string> } = {
    content: ctaContent,
  };
  const resolvedCols = cols === undefined ? { col: 10, sm: 12 } : cols;
  if (resolvedCols != null) {
    column.cols = resolvedCols;
  }

  return <Row halign={halign || undefined} style={rowStyle} columns={[column]} />;
}
