import { useTranslation } from "next-i18next/pages";
import { parseHtmlContent } from "../../commons/parseHtmlContent";

import Row from "../../components/Layout/Row";
import Container from "../../components/Layout/Container";
import SectionIntro from "../../components/SectionIntro";
import SectionCta from "../../components/SectionCta";
import Table from "../../components/Table";
import {
  homeCtaRowStyle,
  homeIntroRowStyle,
  homeIntroSubRowStyle,
  homeTableRowStyle,
} from "../../commons/pageRowSpacing";
import type { SectionWithCtaProps } from "../../commons/sectionTypes";
import { getScheduleCta } from "../../commons/scheduleCta";

const TABLE_COLUMN_KEYS = [
  "dimension",
  "developer",
  "techLead",
  "productManager",
  "fractionalCto",
  "productEngineer",
];

/** Product engineer definition section. Requires i18n: `product-engineer`, `common`. */
export default function ProductEngineerDefinition({ cta, showCta = true }: SectionWithCtaProps) {
  const { t } = useTranslation(["product-engineer", "common"]);
  const scheduleCta = getScheduleCta(t);
  const table = t("product-engineer:table", { returnObjects: true }) as {
    headers?: Record<string, string>;
    rows?: Record<string, React.ReactNode>[];
  };

  const headers = table?.headers;
  const rows = table?.rows ?? [];
  const hasTable = Boolean(headers) && rows.length > 0;

  return (
    <Container
      id={t("product-engineer:anchor")}
      className="section-product-engineer"
      align={"center"}
      halign={"center"}
    >
      <SectionIntro
        badge={t("product-engineer:badge")}
        title={t("product-engineer:title")}
        cols={{ col: 10, sm: 12 }}
        rowStyle={homeIntroRowStyle}
      >
        {t("product-engineer:paragraphOpening") &&
          parseHtmlContent(t("product-engineer:paragraphOpening"))}
        {parseHtmlContent(t("product-engineer:paragraph"))}
      </SectionIntro>
      {hasTable && headers && (
        <>
          <Row
            halign={"center"}
            style={homeIntroSubRowStyle}
            columns={[
              {
                cols: { col: 11, xl: 12, sm: 12 },
                content: <p className="big">{parseHtmlContent(t("product-engineer:intro"))}</p>,
              },
            ]}
          />
          <Row
            halign={"center"}
            style={homeTableRowStyle}
            columns={[
              {
                cols: { col: 10, sm: 12 },
                content: (
                  <Table
                    headers={headers}
                    rows={rows}
                    columnKeys={TABLE_COLUMN_KEYS}
                    rowHeaderKey="dimension"
                  />
                ),
              },
            ]}
          />
        </>
      )}
      {showCta && (
        <SectionCta
          halign="center"
          trackSection="product-engineer"
          href={cta?.link ?? scheduleCta.link}
          label={cta?.label ?? t("product-engineer:footer-cta-label")}
          rowStyle={homeCtaRowStyle}
          className="product-engineer__cta-block"
          teaser={
            t("product-engineer:ctaTeaser") ? (
              <p className="big product-engineer__cta-teaser">
                {parseHtmlContent(t("product-engineer:ctaTeaser"))}
              </p>
            ) : null
          }
        />
      )}
    </Container>
  );
}
