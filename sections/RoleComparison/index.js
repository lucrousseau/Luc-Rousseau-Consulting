import { useTranslation } from "next-i18next";

import Row from "../../components/Layout/Row";
import Container from "../../components/Layout/Container";
import Table from "../../components/Table";

const TABLE_COLUMN_KEYS = [
  "dimension",
  "developer",
  "techLead",
  "productManager",
  "productEngineer",
];

export default function RoleComparison() {
  const { t } = useTranslation(["role-comparison", "product-engineer"]);
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
                <h2 className="underline underline--center">{t("role-comparison:title")}</h2>
                <p className="big">{t("role-comparison:intro")}</p>
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
    </Container>
  );
}
