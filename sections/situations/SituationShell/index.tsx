import type { ReactNode } from "react";
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
import type { SituationBlock } from "../situationTypes";

function hasGroups(block: SituationBlock): boolean {
  return Array.isArray(block?.groups) && block.groups.length > 0;
}

interface SituationBlockProps {
  block: SituationBlock;
}

function SituationBlockRenderer({ block }: SituationBlockProps) {
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
          <NumberedHighlightList
            items={(block.items ?? []) as { title: string; content?: string }[]}
          />
        </SituationSection>
      );

    case "cards": {
      const cardGroups = hasGroups(block) ? block.groups : undefined;
      const cardItems = cardGroups ? undefined : block.items;

      return (
        <SituationSection block={block}>
          {cardGroups ? (
            <SituationGroups
              groups={cardGroups}
              renderGroup={(group) => (
                <ProductGrid
                  items={(group.items ?? []) as { content: string }[]}
                  renderItem={(item) => parseHtmlContent(item.content)}
                  cols={{ col: 4, lg: 10, sm: 12 }}
                />
              )}
            />
          ) : (
            <ProductGrid
              items={(cardItems ?? []) as { content: string }[]}
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
      const headers = table?.headers;
      const rows = table?.rows ?? [];
      if (!headers || rows.length === 0) {
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
                    headers={headers}
                    rows={rows}
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
      const faqItems = parseHtmlItems(
        (block.items ?? []) as { title?: string; content?: string }[]
      );

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
          items={Array.isArray(block.items) ? (block.items as string[]) : []}
          groups={
            hasGroups(block) ? (block.groups as { badge?: string; items?: string[] }[]) : undefined
          }
          background={block.background}
        />
      );

    case "cta":
      return null;

    default:
      return null;
  }
}

interface SituationShellProps {
  namespace: string;
  showSituationsHub?: boolean;
}

/** Renders a full situation page from i18n namespace (`hero` + `blocks[]`). */
export default function SituationShell({
  namespace,
  showSituationsHub = true,
}: SituationShellProps) {
  const { t } = useTranslation([namespace, "common"]);
  const blocks = t("blocks", { returnObjects: true });
  const blockList = (Array.isArray(blocks) ? blocks : []) as SituationBlock[];

  return (
    <>
      <SituationHero namespace={namespace} showSituationsHub={showSituationsHub} />
      {blockList.map((block, index) => (
        <SituationBlockRenderer key={`${block.type}-${block.sectionKey ?? index}`} block={block} />
      ))}
    </>
  );
}
