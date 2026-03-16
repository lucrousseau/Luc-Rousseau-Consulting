import { useTranslation } from "next-i18next";
import parse from "html-react-parser";

import Row from "../../components/Layout/Row";
import Container from "../../components/Layout/Container";

import Button from "../../components/Button";
import Accordion from "../../components/Accordion";

export default function Benefits() {
  const { t } = useTranslation();
  const items = t("benefits:items", { returnObjects: true }).map((item) => ({
    ...item,
    content: parse(item.content),
  }));

  return (
    <Container id={t("benefits:anchor")} align={"center"} halign={"center"}>
      <Row
        halign={"center"}
        style={{ "--padding-bottom": "2rem" }}
        columns={[
          {
            cols: { col: 11, xl: 12, sm: 12 },
            content: (
              <>
                <h2 className="underline underline--center">{t("benefits:title")}</h2>
                {parse(t("benefits:summary"))}
              </>
            ),
          },
        ]}
      />
      <Row
        align={"left"}
        columns={[
          {
            cols: { col: 10, sm: 12 },
            content: <Accordion align={"left"} items={items} />,
          },
        ]}
      />
      <Row
        style={{ "--padding-top": "2rem", "--sm-padding-top": "2rem" }}
        columns={[
          {
            content: (
              <p>
                <Button
                  variant={"primary"}
                  href={t("hello@lucrousseau.com")}
                  label={t("benefits:footer-cta-label")}
                />
              </p>
            ),
          },
        ]}
      />
    </Container>
  );
}
