import { useTranslation } from "next-i18next";
import parse from "html-react-parser";

import Row from "../../components/Layout/Row";
import Container from "../../components/Layout/Container";

import Picture from "../../components/Picture";
import Button from "../../components/Button";

export default function HomeHero() {
  const { t } = useTranslation();

  return (
    <Container
      id={t("home-hero:anchor")}
      align={"center"}
      halign={"center"}
      style={{ "--padding-top": 0 }}
    >
      <Row
        reverse={["md"]}
        columns={[
          {
            cols: { col: 6, lg: 0 },
            content: (
              <Picture
                src={"/images/luc-profil-full.jpg"}
                width={1035}
                height={1570}
                alt={"Luc Rousseau"}
                absolute={true}
                priority={true}
              />
            ),
          },
          {
            cols: { col: 6, lg: 12 },
            content: (
              <Row
                halign={"center"}
                columns={[
                  {
                    cols: { col: 11, xl: 12, sm: 12 },
                    style: {
                      "--padding-top": "3rem",
                      "--padding-bottom": "3rem",
                      "--sm-padding-top": "0rem",
                      "--sm-padding-bottom": "0rem",
                      "--xs-padding-top": "0rem",
                      "--xs-padding-bottom": "0rem",
                    },
                    content: (
                      <>
                        <h1>{t("home-hero:title")}</h1>
                        <h3>{t("home-hero:subtitle")}</h3>
                        <Row
                          halign={"center"}
                          columns={[
                            {
                              cols: { col: 5, sm: 7 },
                              content: (
                                <Picture
                                  src={"/images/luc-profil-photo.jpg"}
                                  width={1003}
                                  height={1003}
                                  alt={"Luc Rousseau"}
                                  rounded={true}
                                />
                              ),
                            },
                          ]}
                        />
                        {parse(t("home-hero:content"))}
                        <p>
                          <Button
                            variant={"primary"}
                            href={t("hello@lucrousseau.com")}
                            label={t("home-hero:footer-cta-label")}
                          />
                        </p>
                      </>
                    ),
                  },
                ]}
              />
            ),
          },
        ]}
      />
    </Container>
  );
}
