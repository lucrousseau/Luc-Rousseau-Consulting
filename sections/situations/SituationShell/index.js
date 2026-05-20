import { useTranslation } from "next-i18next";
import parse from "html-react-parser";

import Row from "../../../components/Layout/Row";
import Container from "../../../components/Layout/Container";
import SectionCta from "../../../components/SectionCta";
import ProductGrid from "../../../components/ProductGrid";
import NumberedHighlightList from "../../../components/NumberedHighlightList";
import Accordion from "../../../components/Accordion";
import Table from "../../../components/Table";
import { parseHtmlContent, parseHtmlItems } from "../../../commons/parseHtmlContent";
import {
  homeIntroRowStyle,
  homeTableRowStyle,
  homeSituationCtaRowStyle,
} from "../../../commons/pageRowSpacing";
import { getScheduleCta } from "../../../commons/scheduleCta";

import TechnicalStack from "../../TechnicalStack";
import SituationHero from "../SituationHero";
import SituationGroups from "../SituationGroups";
import SituationSection from "../SituationSection";
import SituationSplit from "../SituationSplit";
import { situationBlockClassName } from "../situationBlockClassName";

function hasGroups(block) {
  return Array.isArray(block?.groups) && block.groups.length > 0;
}

function SituationBlock({ block, scheduleCta }) {
  if (!block?.type) {
    return null;
  }

  switch (block.type) {
    case "intro":
      return <SituationSection block={block}>{null}</SituationSection>;

    case "split":
      return (
        <Container className={situationBlockClassName(block)} align="center" halign="center">
          <SituationSplit block={block} />
        </Container>
      );

    case "highlights":
      return (
        <SituationSection block={block}>
          <NumberedHighlightList items={block.items} />
        </SituationSection>
      );

    case "cards": {
      const cardGroups = hasGroups(block) ? block.groups : null;
      const cardItems = cardGroups ? null : block.items;

      return (
        <SituationSection block={block}>
          {cardGroups ? (
            <SituationGroups
              groups={cardGroups}
              renderGroup={(group) => (
                <ProductGrid
                  items={group.items}
                  renderItem={(item) => parseHtmlContent(item.content)}
                  cols={{ col: 4, lg: 10, sm: 12 }}
                />
              )}
            />
          ) : (
            <ProductGrid
              items={cardItems}
              renderItem={(item) => parseHtmlContent(item.content)}
              cols={{ col: 4, lg: 10, sm: 12 }}
            />
          )}
        </SituationSection>
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
        <SituationSection
          block={block}
          introChildren={
            <>
              {block.intro && <p className="big">{parse(block.intro)}</p>}
              {block.lede && parse(block.lede)}
            </>
          }
        >
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
        </SituationSection>
      );
    }

    case "faq": {
      const faqItems = parseHtmlItems(block.items);

      return (
        <SituationSection block={block}>
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
        </SituationSection>
      );
    }

    case "stack":
      return (
        <TechnicalStack
          className={situationBlockClassName(block)}
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
        <Container className={situationBlockClassName(block)} align="center" halign="center">
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
          key={`${block.type}-${block.sectionKey ?? index}`}
          block={block}
          scheduleCta={scheduleCta}
        />
      ))}
    </>
  );
}
