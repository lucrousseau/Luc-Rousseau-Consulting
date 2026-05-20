import Row from "../Layout/Row";

const DEFAULT_COLS = { col: 11, xl: 12, sm: 12 };

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
}) {
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
