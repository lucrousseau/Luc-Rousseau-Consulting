import classNames from "classnames";
import parse from "html-react-parser";

import Row from "../../components/Layout/Row";
import Container from "../../components/Layout/Container";
import SectionIntro from "../../components/SectionIntro";
import SectionCta from "../../components/SectionCta";
import Tags from "../../components/Tags";
import { ROME_BACKGROUND } from "../../commons/romeBackground";
import { homeCtaRowStyle, homeIntroRowStyle } from "../../commons/pageRowSpacing";

/**
 * Technical stack / foundations block (tags + optional CTA). Used on home and situation pages.
 * @param {object} props
 * @param {string} [props.id]
 * @param {string} [props.className]
 * @param {string} props.badge
 * @param {string} props.title
 * @param {import('react').ReactNode | string} [props.lede]
 * @param {string[]} props.items
 * @param {{ label: string; href: string; trackSection?: string }} [props.footerCta]
 * @param {string} [props.backgroundColor]
 * @param {"rome"} [props.background]
 * @param {string} [props.tagEmoji]
 */
export default function TechnicalStack({
  id,
  className,
  badge,
  title,
  lede,
  items = [],
  footerCta,
  backgroundColor,
  background,
  tagEmoji = "⭐️",
}) {
  const imageBackground = background === "rome" ? ROME_BACKGROUND : undefined;
  const tagItems = items.map((content) => ({
    content,
    emoji: tagEmoji,
  }));

  const ledeContent = typeof lede === "string" ? parse(lede) : lede;

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
      {tagItems.length > 0 && (
        <Row
          columns={[
            {
              cols: { col: 10, sm: 12 },
              content: <Tags halign="center" items={tagItems} />,
            },
          ]}
        />
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
