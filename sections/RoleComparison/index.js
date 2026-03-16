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

export default function RoleComparison({ cta }) {
  const { t } = useTranslation(["role-comparison", "product-engineer", "common"]);
  const table = t("product-engineer:table", { returnObjects: true });

  if (!table?.headers || !table?.rows?.length) {
    return null;
  }

  const { headers, rows } = table;

  return (
    <Container id={t("role-comparison:anchor")} align={"center"} halign={"center"}>
      <Row
        halign={"center"}
        style={{
          "--padding-bottom": "2rem",
          "--sm-padding-bottom": "0rem",
        }}
        columns={[
          {
            cols: { col: 11, xl: 12, sm: 12 },
            content: (
              <>
                <p className="section__badge">{t("role-comparison:badge")}</p>
                <h2 className="underline underline--center">{t("role-comparison:title")}</h2>
                <p className="big">{parse(t("role-comparison:intro"))}</p>
              </>
            ),
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
      <Row
        halign={"center"}
        style={{ "--padding-top": "2rem", "--padding-bottom": "2rem" }}
        columns={[
          {
            cols: { col: 10, sm: 12 },
            content: (
              <p>
                <Button
                  variant={"primary"}
                  href={cta?.link ?? t("common:schedule-me")}
                  label={cta?.label ?? t("role-comparison:footer-cta-label")}
                />
              </p>
            ),
          },
        ]}
      />
    </Container>
  );
}
