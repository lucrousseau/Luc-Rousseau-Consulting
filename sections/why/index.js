import { useTranslation } from "next-i18next";
import parse from "html-react-parser";

import Row from "../../components/Layout/Row";
import Container from "../../components/Layout/Container";

import Button from "../../components/Button";

export default function Why() {
  const { t } = useTranslation();

  return (
    <Container
      id={t("why:anchor")}
      align={"center"}
      halign={"center"}
      background={{
        src: "/images/rome-1.jpg",
        alt: "Rome",
        width: 2528,
        height: 1264,
      }}
    >
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
                <h2 className="underline underline--center">
                  {t("why:title")}
                </h2>
                {parse(t("why:summary"))}
              </>
            ),
          },
        ]}
      />
      <Row
        columns={[
          {
            cols: { col: 10, sm: 12 },
            content: (
              <>
                {parse(t("why:content"))}
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
                            href={t("hello@lucrousseau.com")}
                            label={t("why:footer-cta-label")}
                          />
                        </p>
                      ),
                    },
                  ]}
                />
              </>
            ),
          },
        ]}
      />
    </Container>
  );
}
