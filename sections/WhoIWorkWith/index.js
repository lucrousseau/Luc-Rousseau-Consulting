import { useTranslation } from "next-i18next";
import parse from "html-react-parser";

import Row from "../../components/Layout/Row";
import Container from "../../components/Layout/Container";
import SectionIntro from "../../components/SectionIntro";
import SectionCta from "../../components/SectionCta";
import { homeCtaRowStyle, homeIntroRowStyle } from "../../commons/pageRowSpacing";
import { getScheduleCta } from "../../commons/scheduleCta";

import romeImage from "./images/rome-1.jpg";

export default function WhoIWorkWith({ backgroundColor, cta }) {
  const { t } = useTranslation();
  const scheduleCta = getScheduleCta(t);

  return (
    <Container
      id={t("who-i-work-with:anchor")}
      className="section-who-i-work-with"
      align={"center"}
      halign={"center"}
      background={{
        src: romeImage,
        alt: "Rome",
        width: 2528,
        height: 1264,
      }}
      backgroundColor={backgroundColor}
    >
      <SectionIntro
        badge={t("who-i-work-with:badge")}
        title={t("who-i-work-with:title")}
        lede={parse(t("who-i-work-with:summary"))}
        rowStyle={homeIntroRowStyle}
      />
      <Row
        columns={[
          {
            cols: { col: 10, sm: 12 },
            content: (
              <>
                <ul className="align--left who-i-work-with__list">
                  {t("who-i-work-with:items", { returnObjects: true }).map((item) => (
                    <li key={item.title}>
                      <h3 className="h3">{item.title}</h3>
                      <p>{parse(item.content)}</p>
                    </li>
                  ))}
                </ul>
                <Row
                  style={homeCtaRowStyle}
                  columns={[
                    {
                      content: (
                        <SectionCta
                          wrapRow={false}
                          bare
                          trackSection="who-i-work-with"
                          href={cta?.link ?? scheduleCta.link}
                          label={cta?.label ?? t("who-i-work-with:footer-cta-label")}
                        />
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
