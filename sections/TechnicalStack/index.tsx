import classNames from "classnames";
import type { CSSProperties, ReactNode } from "react";

import Row from "../../components/Layout/Row";
import { parseHtmlContent } from "../../commons/parseHtmlContent";
import Container from "../../components/Layout/Container";
import SectionIntro from "../../components/SectionIntro";
import SectionCta from "../../components/SectionCta";
import Tags from "../../components/Tags";
import { ROME_BACKGROUND } from "../../commons/romeBackground";
import { homeCtaRowStyle, homeIntroRowStyle } from "../../commons/pageRowSpacing";
import SituationGroups from "../situations/SituationGroups";

export interface TechnicalStackProps {
  id?: string;
  className?: string;
  badge?: string;
  title?: string;
  lede?: ReactNode | string;
  items?: string[];
  groups?: { badge?: string; items?: string[] }[];
  footerCta?: { label: string; href: string; trackSection?: string };
  backgroundColor?: string;
  background?: "rome";
}

/** Technical stack / foundations block (tags + optional CTA). Used on home and situation pages. */
export default function TechnicalStack({
  id,
  className,
  badge,
  title,
  lede,
  items = [],
  groups,
  footerCta,
  backgroundColor,
  background,
}: TechnicalStackProps) {
  const imageBackground = background === "rome" ? ROME_BACKGROUND : undefined;
  const tagItems = items.map((content) => ({ content }));
  const hasTagGroups = Array.isArray(groups) && groups.length > 0;

  const ledeContent = typeof lede === "string" ? parseHtmlContent(lede) : lede;

  const renderTagRow = (list: string[]) => {
    const rowItems = list.map((content) => ({ content }));
    if (rowItems.length === 0) {
      return null;
    }
    return (
      <Row
        columns={[
          {
            cols: { col: 10, sm: 12 },
            content: <Tags halign="center" items={rowItems} />,
          },
        ]}
      />
    );
  };

  return (
    <Container
      id={id}
      className={classNames("section-technical-stack", className, {
        "section-technical-stack--rome": background === "rome",
      })}
      align="center"
      halign="center"
      background={imageBackground}
      backgroundColor={backgroundColor}
    >
      <SectionIntro badge={badge} title={title} lede={ledeContent} rowStyle={homeIntroRowStyle} />
      {hasTagGroups ? (
        <SituationGroups
          groups={groups}
          renderGroup={(group) => renderTagRow((group.items ?? []) as string[])}
        />
      ) : (
        renderTagRow(tagItems.map((tag) => tag.content))
      )}
      {footerCta?.label && footerCta?.href && (
        <SectionCta
          bare
          trackSection={footerCta.trackSection ?? "technical-stack"}
          href={footerCta.href}
          label={footerCta.label}
          rowStyle={homeCtaRowStyle}
          cols={null}
        />
      )}
    </Container>
  );
}
