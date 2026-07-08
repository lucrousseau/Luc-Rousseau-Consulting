import { useTranslation } from "next-i18next/pages";
import Row from "../../../components/Layout/Row";
import Container from "../../../components/Layout/Container";
import ProductGrid from "../../../components/ProductGrid";
import NumberedHighlightList from "../../../components/NumberedHighlightList";
import Accordion from "../../../components/Accordion";
import Table from "../../../components/Table";
import { parseHtmlContent, parseHtmlItems } from "../../../commons/parseHtmlContent";
import { homeTableRowStyle } from "../../../commons/pageRowSpacing";

import TechnicalStack from "../../TechnicalStack";
import SituationHero from "../SituationHero";
import SituationGroups from "../SituationGroups";
import SituationSection from "../SituationSection";
import SituationSplit from "../SituationSplit";
import { situationBlockClassName } from "../situationBlockClassName";

function hasGroups(block) {
  return Array.isArray(block?.groups) && block.groups.length > 0;
}

function SituationBlock({ block }) {
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
              {block.intro && <p className="big">{parseHtmlContent(block.intro)}</p>}
              {block.lede && parseHtmlContent(block.lede)}
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
      return null;

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
  const blocks = t("blocks", { returnObjects: true });
  const blockList = Array.isArray(blocks) ? blocks : [];

  return (
    <>
      <SituationHero namespace={namespace} />
      {blockList.map((block, index) => (
        <SituationBlock key={`${block.type}-${block.sectionKey ?? index}`} block={block} />
      ))}
    </>
  );
}
