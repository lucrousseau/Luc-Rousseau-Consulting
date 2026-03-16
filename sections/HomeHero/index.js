import React, { useState } from "react";
import { useTranslation } from "next-i18next";
import parse from "html-react-parser";

import Row from "../../components/Layout/Row";
import Picture from "../../components/Picture";
import Buy from "../../components/Buy";
import Accordion from "../../components/Accordion";
import Container from "../../components/Layout/Container";

export default function HomeHero() {
  const { t } = useTranslation();
  const [opened, setOpened] = useState(false);
  const accordionCallback = ({ open }) => setOpened(open);

  const items = t("home-hero:items", { returnObjects: true }).map((item) => {
    return {
      ...item,
      content: parse(item.content),
    };
  });

  return (
    <Container id={t("home-hero:anchor")} align={"center"} halign={"center"}>
      <h1>{t("home-hero:title")}</h1>
      <h2>{t("home-hero:quote")}</h2>
      <Row
        halign={"center"}
        columns={[
          {
            cols: { col: 10, xl: 12, sm: 12 },
            content: (
              <>
                <Row
                  halign={"center"}
                  valign={!opened ? "middle" : null}
                  style={{
                    "--padding-top": "2rem",
                    "--padding-bottom": "2rem",
                  }}
                  columns={[
                    {
                      cols: { col: 6, lg: 8, md: 12 },
                      content: (
                        <div
                          style={{
                            position: "sticky",
                            top: "1rem",
                          }}
                        >
                          <Row
                            halign={"center"}
                            columns={[
                              {
                                cols: { col: 6, sm: 9 },
                                content: (
                                  <Picture
                                    src={"/images/luc-profil-photo.jpg"}
                                    width={600}
                                    height={600}
                                    alt={"Luc Rousseau"}
                                    rounded={true}
                                    loading={"eager"}
                                    sizes={"(max-width: 600px) 100vw, 400px"}
                                  />
                                ),
                              },
                            ]}
                          />
                          <h3>{t("home-hero:manifesto")}</h3>
                        </div>
                      ),
                    },
                    {
                      cols: { col: 6, lg: 10, md: 12 },
                      content: (
                        <>
                          <Accordion align={"left"} callback={accordionCallback} items={items} />
                        </>
                      ),
                    },
                  ]}
                />
                <Row
                  halign={"center"}
                  columns={[
                    {
                      cols: { col: 8, md: 12 },
                      content: (
                        <>
                          <Buy
                            price={null}
                            legend={t("home-hero:buy:legend")}
                            prefix={parse(t("home-hero:buy:prefix"))}
                            label={t("common:schedule-me-label")}
                            className={"biggest"}
                            variant={"primary"}
                            size={null}
                          />
                          {parse(t("home-hero:buy:more"))}
                        </>
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
