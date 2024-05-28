import { useTranslation } from "next-i18next";
import parse from "html-react-parser";

import Row from "../../components/Layout/Row";
import Container from "../../components/Layout/Container";

import Button from "../../components/Button";
import Tags from "../../components/Tags";

export default function Technologies({ backgroundColor, cta }) {
  const { t } = useTranslation();

  const items = t("technologies:items", { returnObjects: true }).map(
    (item) => ({
      content: item,
      emoji: "⭐️",
    })
  );

  return (
    <Container
      id={t("technologies:anchor")}
      align={"center"}
      halign={"center"}
      backgroundColor={backgroundColor}
    >
      <Row
        halign={"center"}
        style={{
          "--padding-bottom": "2rem",
          "--sm-padding-bottom": "2rem",
        }}
        columns={[
          {
            cols: { col: 11, xl: 12, sm: 12 },
            content: (
              <>
                <h2 className="underline underline--center">
                  {t("technologies:title")}
                </h2>
                {parse(t("technologies:summary"))}
              </>
            ),
          },
        ]}
      />
      <Row
        columns={[
          {
            cols: { col: 10, sm: 12 },
            content: <Tags halign={"center"} items={items} />,
          },
        ]}
      />
      <Row
        style={{
          "--padding-top": "2rem",
          "--sm-padding-top": "2rem",
        }}
        columns={[
          {
            content: (
              <p>
                <Button
                  variant={"primary"}
                  href={cta?.link ?? t("hello@lucrousseau.com")}
                  label={cta?.label ?? t("technologies:footer-cta-label")}
                />
              </p>
            ),
          },
        ]}
      />
    </Container>
  );
}
