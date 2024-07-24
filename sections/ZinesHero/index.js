import React, { useState } from "react";
import { useTranslation } from "next-i18next";
import parse from "html-react-parser";

import Row from "../../components/Layout/Row";
import Picture from "../../components/Picture";
import Button from "../../components/Button";
import Accordion from "../../components/Accordion";
import Container from "../../components/Layout/Container";

export default function ZinesHero() {
  const { t } = useTranslation();
  const [opened, setOpened] = useState(false);
  const accordionCallback = ({ open }) => setOpened(open);

  const items = t("zines-hero:items", { returnObjects: true }).map((item) => {
    const content = (
      <>
        {parse(item.content)}

        {item["cta-link"] && item["cta-label"] && (
          <p align="right">
            <Button
              variant={"secondary"}
              size={"small"}
              href={item["cta-link"]}
              label={item["cta-label"]}
            />
          </p>
        )}
      </>
    );

    return {
      ...item,
      content,
    };
  });

  return (
    <Container id={t("zines-hero:anchor")} align={"center"} halign={"center"}>
      <h1>{t("zines-hero:title")}</h1>
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
                          {parse(t("zines-hero:quote"))}
                        </div>
                      ),
                    },
                    {
                      cols: { col: 6, lg: 10, md: 12 },
                      content: (
                        <>
                          <Accordion
                            align={"left"}
                            activeIndex={0}
                            callback={accordionCallback}
                            items={items}
                          />
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
