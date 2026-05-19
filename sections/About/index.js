import { useTranslation } from "next-i18next";
import parse from "html-react-parser";

import Row from "../../components/Layout/Row";
import Container from "../../components/Layout/Container";
import SectionIntro from "../../components/SectionIntro";
import SectionCta from "../../components/SectionCta";
import { homeIntroRowStyle } from "../../commons/pageRowSpacing";
import { getScheduleCta } from "../../commons/scheduleCta";

/**
 * About section. Requires i18n namespaces: `about`, `common`.
 * @param {import('../../commons/sectionTypes').SectionWithCtaProps} props
 */
export default function About({ cta }) {
  const { t } = useTranslation();
  const scheduleCta = getScheduleCta(t);

  return (
    <Container id={t("about:anchor")} className="section-about" align={"center"} halign={"center"}>
      <SectionIntro
        badge={t("about:badge")}
        title={t("about:title")}
        lede={<div className="big">{parse(t("about:content"))}</div>}
        cols={{ col: 10, sm: 12 }}
        rowStyle={homeIntroRowStyle}
      />
      <Row
        halign={"center"}
        columns={[
          {
            cols: { col: 10, sm: 12 },
            content: (
              <SectionCta
                wrapRow={false}
                trackSection="about"
                href={cta?.link ?? scheduleCta.link}
                label={cta?.label ?? scheduleCta.label}
                className="about__cta"
              />
            ),
          },
        ]}
      />
    </Container>
  );
}
