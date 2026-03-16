import { useTranslation } from "next-i18next";
import parse from "html-react-parser";

import Row from "../../components/Layout/Row";
import Container from "../../components/Layout/Container";
import Table from "../../components/Table";
import Button from "../../components/Button";

const TABLE_COLUMN_KEYS = [
  "dimension",
  "developer",
  "techLead",
  "productManager",
  "productEngineer",
];

export default function ProductEngineerDefinition({ cta }) {
  const { t } = useTranslation(["product-engineer", "common"]);
  const table = t("product-engineer:table", { returnObjects: true });

  const hasTable = table?.headers && table?.rows?.length > 0;
  const { headers, rows } = hasTable ? table : { headers: null, rows: [] };

  return (
    <Container id={t("product-engineer:anchor")} align={"center"} halign={"center"}>
      <Row
        halign={"center"}
        style={{
          "--padding-bottom": "2rem",
          "--sm-padding-bottom": "0rem",
        }}
        columns={[
          {
            cols: { col: 10, sm: 12 },
            content: (
              <>
                <p className="section__badge">{t("product-engineer:badge")}</p>
                <h2 className="underline underline--center">{t("product-engineer:title")}</h2>
                {parse(t("product-engineer:paragraph"))}
              </>
            ),
          },
        ]}
      />
      {hasTable && (
        <>
          <Row
            halign={"center"}
            style={{ "--padding-bottom": "2rem" }}
            columns={[
              {
                cols: { col: 11, xl: 12, sm: 12 },
                content: <p className="big">{parse(t("product-engineer:intro"))}</p>,
              },
            ]}
          />
          <Row
            halign={"center"}
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
      <Row
        halign={"center"}
        style={{ "--padding-top": "2rem", "--padding-bottom": "2rem" }}
        columns={[
          {
            cols: { col: 10, sm: 12 },
            content: (
              <div className="align align--center product-engineer__cta-block">
                {t("product-engineer:ctaTeaser") && (
                  <p className="big product-engineer__cta-teaser">
                    {parse(t("product-engineer:ctaTeaser"))}
                  </p>
                )}
                <p>
                  <Button
                    variant="primary"
                    href={cta?.link ?? t("common:schedule-me")}
                    label={cta?.label ?? t("product-engineer:footer-cta-label")}
                  />
                </p>
              </div>
            ),
          },
        ]}
      />
    </Container>
  );
}
