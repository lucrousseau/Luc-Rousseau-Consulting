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
  homeIntroSubRowStyle,
  homePreCtaContentRowStyle,
} from "../../../commons/pageRowSpacing";
import { getScheduleCta } from "../../../commons/scheduleCta";

import GuideHero from "../GuideHero";

function parseBlockItems(items) {
  if (!Array.isArray(items)) {
    return [];
  }
  return items.map((item) => ({
    ...item,
    content: item.content ? parse(item.content) : null,
  }));
}

function GuideBlock({ block, namespace, scheduleCta }) {
  if (!block?.type) {
    return null;
  }

  switch (block.type) {
    case "intro":
      return (
        <Container
          className="section-guide-block section-guide-block--intro"
          align="center"
          halign="center"
        >
          <SectionIntro
            badge={block.badge}
            title={block.title}
            lede={block.lede ? parse(block.lede) : null}
            rowStyle={homeIntroRowStyle}
          />
        </Container>
      );

    case "cards":
      return (
        <Container
          className="section-guide-block section-guide-block--cards"
          align="center"
          halign="center"
        >
          {(block.badge || block.title) && (
            <SectionIntro
              badge={block.badge}
              title={block.title}
              lede={block.lede ? parse(block.lede) : null}
              rowStyle={homeIntroRowStyle}
            />
          )}
          <ProductGrid
            items={block.items}
            renderItem={(item) => parse(item.content)}
            cols={{ col: 4, lg: 10, sm: 12 }}
          />
        </Container>
      );

    case "comparison": {
      const table = block.table;
      const columnKeys = block.columnKeys;
      const hasTable = table?.headers && table?.rows?.length > 0;
      if (!hasTable) {
        return null;
      }
      return (
        <Container
          className="section-guide-block section-guide-block--comparison"
          align="center"
          halign="center"
        >
          <SectionIntro badge={block.badge} title={block.title} rowStyle={homeIntroRowStyle}>
            {block.lede && parse(block.lede)}
          </SectionIntro>
          {block.intro && (
            <Row
              halign="center"
              style={homeIntroSubRowStyle}
              columns={[
                {
                  cols: { col: 11, xl: 12, sm: 12 },
                  content: <p className="big">{parse(block.intro)}</p>,
                },
              ]}
            />
          )}
          <Row
            halign="center"
            style={homePreCtaContentRowStyle}
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
        <Container
          className="section-guide-block section-guide-block--faq"
          align="center"
          halign="center"
        >
          <SectionIntro
            badge={block.badge}
            title={block.title}
            lede={block.lede ? parse(block.lede) : null}
            rowStyle={homeIntroRowStyle}
          />
          <Row
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

    case "cta":
      return (
        <Container
          className="section-guide-block section-guide-block--cta"
          align="center"
          halign="center"
        >
          <SectionCta
            halign="center"
            trackSection={block.trackSection ?? "guide"}
            href={block.href ?? scheduleCta.link}
            label={block.label ?? scheduleCta.label}
            teaser={block.teaser ? parse(block.teaser) : null}
            rowStyle={homeCtaRowStyle}
          />
        </Container>
      );

    default:
      return null;
  }
}

/**
 * Renders a full guide from i18n namespace (`hero` + `blocks[]`).
 * @param {{ namespace: string }} props
 */
export default function GuideShell({ namespace }) {
  const { t } = useTranslation([namespace, "common"]);
  const scheduleCta = getScheduleCta(t);
  const blocks = t("blocks", { returnObjects: true });
  const blockList = Array.isArray(blocks) ? blocks : [];

  return (
    <>
      <GuideHero namespace={namespace} />
      {blockList.map((block, index) => (
        <GuideBlock
          key={`${block.type}-${index}`}
          block={block}
          namespace={namespace}
          scheduleCta={scheduleCta}
        />
      ))}
    </>
  );
}
