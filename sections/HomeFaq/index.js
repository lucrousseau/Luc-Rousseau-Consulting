import { useTranslation } from "next-i18next";
import parse from "html-react-parser";

import Row from "../../components/Layout/Row";
import Container from "../../components/Layout/Container";
import Accordion from "../../components/Accordion";

export default function HomeFaq() {
  const { t } = useTranslation();

  const items = t("faq:items", { returnObjects: true }).map((item) => ({
    title: item.title,
    content: parse(item.content),
  }));

  return (
    <Container id={t("faq:anchor")} className="section-home-faq" align={"center"} halign={"center"}>
      <Row
        halign={"center"}
        style={{
          "--padding-bottom": "2rem",
          "--sm-padding-bottom": "1.5rem",
        }}
        columns={[
          {
            cols: { col: 11, xl: 12, sm: 12 },
            content: (
              <>
                <p className="section__badge">{t("faq:badge")}</p>
                <h2 className="underline underline--center">{t("faq:title")}</h2>
                {parse(t("faq:intro"))}
              </>
            ),
          },
        ]}
      />
      <Row
        columns={[
          {
            cols: { col: 10, sm: 12 },
            content: <Accordion align={"left"} items={items} />,
          },
        ]}
      />
    </Container>
  );
}
