import { useTranslation } from "next-i18next/pages";
import { parseHtmlContent } from "../../commons/parseHtmlContent";

import Row from "../../components/Layout/Row";
import Picture from "../../components/Picture";
import Buy from "../../components/Buy";
import Accordion from "../../components/Accordion";
import Container from "../../components/Layout/Container";
import { homeCtaRowStyle } from "../../commons/pageRowSpacing";

import lucProfilPhoto from "./images/luc-profil-photo.jpg";

/**
 * Home hero (h1/h2, accordion, Buy). Requires i18n: `home-hero`, `common`.
 * Intentionally not using SectionIntro; CTA via Buy → SectionCta.
 */
export default function HomeHero() {
  const { t } = useTranslation();

  const rawItems = t("home-hero:items", { returnObjects: true });
  const items = (
    (Array.isArray(rawItems) ? rawItems : []) as { title?: string; content: string }[]
  ).map((item) => {
    return {
      ...item,
      content: parseHtmlContent(item.content),
    };
  });

  return (
    <Container
      id={t("home-hero:anchor")}
      className="section-home-hero"
      align={"center"}
      halign={"center"}
    >
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
                  className="section-home-hero__split"
                  halign={"center"}
                  valign={"middle"}
                  style={homeCtaRowStyle}
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
                                    src={lucProfilPhoto}
                                    width={480}
                                    height={480}
                                    alt={t("home-hero:profile-image-alt")}
                                    rounded={true}
                                    priority={true}
                                    sizes={"(max-width: 600px) 90vw, 400px"}
                                  />
                                ),
                              },
                            ]}
                          />
                          <h3>{parseHtmlContent(t("home-hero:manifesto"))}</h3>
                        </div>
                      ),
                    },
                    {
                      cols: { col: 6, lg: 10, md: 12 },
                      content: (
                        <>
                          <Accordion align={"left"} items={items} />
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
                            prefix={parseHtmlContent(t("home-hero:buy:prefix"))}
                            className={"biggest"}
                            variant={"primary"}
                            size={null}
                            trackSection="hero"
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
