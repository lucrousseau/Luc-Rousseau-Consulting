import { useTranslation } from "next-i18next";
import parse from "html-react-parser";

import Row from "../../components/Layout/Row";
import Container from "../../components/Layout/Container";

export default function ProductEngineerDefinition() {
  const { t } = useTranslation("product-engineer");

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
                {parse(t("product-engineer:paragraph1"))}
                {parse(t("product-engineer:paragraph2"))}
              </>
            ),
          },
        ]}
      />
    </Container>
  );
}
