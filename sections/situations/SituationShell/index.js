import { useTranslation } from "next-i18next";
import parse from "html-react-parser";

import Row from "../../../components/Layout/Row";
import Container from "../../../components/Layout/Container";
import SectionIntro from "../../../components/SectionIntro";
import SectionCta from "../../../components/SectionCta";
import ProductGrid from "../../../components/ProductGrid";
import Accordion from "../../../components/Accordion";
import Table from "../../../components/Table";
import {
  homeCtaRowStyle,
  homeIntroRowStyle,
  homeTableRowStyle,
  homeSituationCtaRowStyle,
} from "../../../commons/pageRowSpacing";
import { getScheduleCta } from "../../../commons/scheduleCta";

import TechnicalStack from "../../TechnicalStack";
import SituationHero from "../SituationHero";
import SituationGroups from "../SituationGroups";
import SituationHighlights from "../SituationHighlights";

function hasGroups(block) {
  return Array.isArray(block?.groups) && block.groups.length > 0;
}

function blockClassName(block) {
  const parts = ["section-situation-block", `section-situation-block--${block.type}`];
  if (block.sectionKey) {
    parts.push(`section-situation-block--${block.sectionKey}`);
  }
  return parts.join(" ");
}

function parseBlockItems(items) {
  if (!Array.isArray(items)) {
    return [];
  }
  return items.map((item) => ({
    ...item,
    content: item.content ? parse(item.content) : null,
  }));
}

function SituationBlock({ block, namespace, scheduleCta }) {
  if (!block?.type) {
    return null;
  }

  switch (block.type) {
    case "intro":
      return (
        <Container className={blockClassName(block)} align="center" halign="center">
          <SectionIntro
            badge={block.badge}
            title={block.title}
            lede={block.lede ? parse(block.lede) : null}
            rowStyle={homeIntroRowStyle}
          />
        </Container>
      );

    case "highlights":
      return (
        <Container className={blockClassName(block)} align="center" halign="center">
          {(block.badge || block.title) && (
            <SectionIntro
              badge={block.badge}
              title={block.title}
              lede={block.lede ? parse(block.lede) : null}
              rowStyle={homeIntroRowStyle}
            />
          )}
          <SituationHighlights items={block.items} />
        </Container>
      );

    case "cards": {
      const cardGroups = hasGroups(block) ? block.groups : null;
      const cardItems = cardGroups ? null : block.items;
      return (
        <Container className={blockClassName(block)} align="center" halign="center">
          {(block.badge || block.title) && (
            <SectionIntro
              badge={block.badge}
              title={block.title}
              lede={block.lede ? parse(block.lede) : null}
              rowStyle={homeIntroRowStyle}
            />
          )}
          {cardGroups ? (
            <SituationGroups
              groups={cardGroups}
              renderGroup={(group) => (
                <ProductGrid
                  items={group.items}
                  renderItem={(item) => parse(item.content)}
                  cols={{ col: 4, lg: 10, sm: 12 }}
                />
              )}
            />
          ) : (
            <ProductGrid
              items={cardItems}
              renderItem={(item) => parse(item.content)}
              cols={{ col: 4, lg: 10, sm: 12 }}
            />
          )}
        </Container>
      );
    }

    case "comparison": {
      const table = block.table;
      const columnKeys = block.columnKeys;
      const hasTable = table?.headers && table?.rows?.length > 0;
      if (!hasTable) {
        return null;
      }
      return (
        <Container className={blockClassName(block)} align="center" halign="center">
          <SectionIntro badge={block.badge} title={block.title} rowStyle={homeIntroRowStyle}>
            {block.intro && <p className="big">{parse(block.intro)}</p>}
            {block.lede && parse(block.lede)}
          </SectionIntro>
          <Row
            halign="center"
            style={homeTableRowStyle}
            columns={[
              {
                cols: { col: 10, sm: 12 },
                content: (
                  <Table
                    headers={table.headers}
                    rows={table.rows}
                    columnKeys={columnKeys}
                    rowHeaderKey="dimension"
                  />
                ),
              },
            ]}
          />
        </Container>
      );
    }

    case "faq": {
      const faqItems = parseBlockItems(block.items);
      return (
        <Container className={blockClassName(block)} align="center" halign="center">
          <SectionIntro
            badge={block.badge}
            title={block.title}
            lede={block.lede ? parse(block.lede) : null}
            rowStyle={homeIntroRowStyle}
          />
          <Row
            halign="center"
            style={homeTableRowStyle}
            columns={[
              {
                cols: { col: 10, sm: 12 },
                content: <Accordion align="left" items={faqItems} />,
              },
            ]}
          />
        </Container>
      );
    }

    case "stack":
      return (
        <TechnicalStack
          className={blockClassName(block)}
          badge={block.badge}
          title={block.title}
          lede={block.lede}
          items={Array.isArray(block.items) ? block.items : []}
          groups={hasGroups(block) ? block.groups : undefined}
          background={block.background}
        />
      );

    case "cta":
      return (
        <Container className={blockClassName(block)} align="center" halign="center">
          <SectionCta
            halign="center"
            trackSection={block.trackSection ?? "situation"}
            href={block.href ?? scheduleCta.link}
            label={block.label ?? scheduleCta.label}
            teaser={block.teaser ? parse(block.teaser) : null}
            teaserClassName="big"
            beforeCTA={block.badge ? <p className="section__badge">{block.badge}</p> : null}
            rowStyle={homeSituationCtaRowStyle}
          />
        </Container>
      );

    default:
      return null;
  }
}

/**
 * Renders a full situation page from i18n namespace (`hero` + `blocks[]`).
 * @param {{ namespace: string }} props
 */
export default function SituationShell({ namespace }) {
  const { t } = useTranslation([namespace, "common"]);
  const scheduleCta = getScheduleCta(t);
  const blocks = t("blocks", { returnObjects: true });
  const blockList = Array.isArray(blocks) ? blocks : [];

  return (
    <>
      <SituationHero namespace={namespace} />
      {blockList.map((block, index) => (
        <SituationBlock
          key={`${block.type}-${index}`}
          block={block}
          namespace={namespace}
          scheduleCta={scheduleCta}
        />
      ))}
    </>
  );
}
