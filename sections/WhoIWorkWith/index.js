import { useTranslation } from "next-i18next";
import { parseHtmlContent } from "../../commons/parseHtmlContent";

import Row from "../../components/Layout/Row";
import Container from "../../components/Layout/Container";
import SectionIntro from "../../components/SectionIntro";
import SectionCta from "../../components/SectionCta";
import { homeBodyRowStyle, homeIntroRowStyle } from "../../commons/pageRowSpacing";
import { getScheduleCta } from "../../commons/scheduleCta";

import romeImage from "./images/rome-1.jpg";

/**
 * Who I work with section. Requires i18n: `who-i-work-with`, `common`.
 * @param {import('../../commons/sectionTypes').SectionWithBackgroundProps} props
 */
export default function WhoIWorkWith({ backgroundColor, cta, showCta = true }) {
  const { t } = useTranslation(["who-i-work-with", "common"]);
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
        lede={parseHtmlContent(t("who-i-work-with:summary"))}
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
                        <p>{parseHtmlContent(item.content)}</p>
                      </li>
                    ))}
                  </ul>
                </section>

                {showCta && (
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
                )}
              </div>
            ),
          },
        ]}
      />
    </Container>
  );
}
