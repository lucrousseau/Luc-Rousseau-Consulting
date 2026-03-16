import { useTranslation } from "next-i18next";
import parse from "html-react-parser";

import Row from "../../components/Layout/Row";
import Container from "../../components/Layout/Container";

export default function AIResponsible() {
  const { t } = useTranslation();

  return (
    <Container id={t("ai-responsible:anchor")} align={"center"} halign={"center"}>
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
                <h2 className="underline underline--center">{t("ai-responsible:title")}</h2>
                <p className="big">{t("ai-responsible:summary")}</p>
              </>
            ),
          },
        ]}
      />
      <Row
        columns={[
          {
            cols: { col: 10, sm: 12 },
            content: parse(t("ai-responsible:content")),
          },
        ]}
      />
      <Row
        style={{ "--padding-top": "1.5rem" }}
        columns={[
          {
            cols: { col: 10, sm: 12 },
            content: <p className="big">{t("ai-responsible:closing")}</p>,
          },
        ]}
      />
    </Container>
  );
}
