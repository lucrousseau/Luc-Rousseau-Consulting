import { useTranslation } from "next-i18next";
import parse from "html-react-parser";

import Row from "../../components/Layout/Row";
import Container from "../../components/Layout/Container";
import SectionIntro from "../../components/SectionIntro";
import SectionCta from "../../components/SectionCta";
import { homeBodyRowStyle, homeIntroRowStyle } from "../../commons/pageRowSpacing";
import { getScheduleCta } from "../../commons/scheduleCta";
import SituationsQuiz from "../situations/SituationsQuiz";

import romeImage from "./images/rome-1.jpg";

/**
 * Who I work with section. Requires i18n: `who-i-work-with`, `situations-index`, `common`.
 * @param {import('../../commons/sectionTypes').SectionWithBackgroundProps} props
 */
export default function WhoIWorkWith({ backgroundColor, cta }) {
  const { t } = useTranslation(["who-i-work-with", "situations-index", "common"]);
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
        style={homeBodyRowStyle}
        columns={[
          {
            cols: { col: 10, sm: 12 },
            content: (
              <div className="who-i-work-with__content align--left">
                <section
                  className="who-i-work-with__profiles"
                  aria-labelledby="who-i-work-with-profiles-heading"
                >
                  <h3
                    id="who-i-work-with-profiles-heading"
                    className="who-i-work-with__subheading h3"
                  >
                    {t("who-i-work-with:profiles-heading")}
                  </h3>
                  <ul className="who-i-work-with__list">
                    {t("who-i-work-with:items", { returnObjects: true }).map((item) => (
                      <li key={item.title}>
                        <h4 className="h4">{item.title}</h4>
                        <p>{parse(item.content)}</p>
                      </li>
                    ))}
                  </ul>
                </section>

                <section
                  className="who-i-work-with__situations"
                  aria-labelledby="who-i-work-with-situations-heading"
                >
                  <div className="who-i-work-with__situations-intro">
                    <p
                      id="who-i-work-with-situations-heading"
                      className="section__badge who-i-work-with__situations-badge"
                    >
                      {t("who-i-work-with:situations-quiz-badge")}
                    </p>
                    <p className="big who-i-work-with__situations-lede">
                      {t("who-i-work-with:situations-quiz-lede")}
                    </p>
                  </div>
                  <SituationsQuiz className="who-i-work-with__routing-quiz" />
                </section>

                <div className="who-i-work-with__cta align--center">
                  <SectionCta
                    wrapRow={false}
                    bare
                    align="center"
                    trackSection="who-i-work-with"
                    href={cta?.link ?? scheduleCta.link}
                    label={cta?.label ?? t("who-i-work-with:footer-cta-label")}
                  />
                </div>
              </div>
            ),
          },
        ]}
      />
    </Container>
  );
}
