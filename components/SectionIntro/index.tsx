import type { CSSProperties, ReactNode } from "react";

import Row from "../Layout/Row";

const DEFAULT_COLS = { col: 11, xl: 12, sm: 12 };

export interface SectionIntroProps {
  badge?: ReactNode;
  title?: ReactNode;
  lede?: ReactNode;
  children?: ReactNode;
  cols?: Record<string, number | string>;
  rowStyle?: CSSProperties;
  halign?: string;
  titleClassName?: string;
  titleAs?: "h1" | "h2";
}

export default function SectionIntro({
  badge,
  title,
  lede,
  children,
  cols = DEFAULT_COLS,
  rowStyle,
  halign = "center",
  titleClassName = "underline underline--center",
  titleAs = "h2",
}: SectionIntroProps) {
  const TitleTag = titleAs === "h1" ? "h1" : "h2";

  return (
    <Row
      halign={halign}
      style={rowStyle}
      columns={[
        {
          cols,
          content: (
            <>
              {badge != null && badge !== "" && <p className="section__badge">{badge}</p>}
              {title != null && title !== "" && (
                <TitleTag className={titleClassName}>{title}</TitleTag>
              )}
              {lede}
              {children}
            </>
          ),
        },
      ]}
    />
  );
}
