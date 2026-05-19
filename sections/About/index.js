import { useTranslation } from "next-i18next";
import parse from "html-react-parser";

import Row from "../../components/Layout/Row";
import Container from "../../components/Layout/Container";
import { homeIntroRowStyle } from "../../commons/pageRowSpacing";
import { getScheduleCta } from "../../commons/scheduleCta";
import Button from "../../components/Button";
import ContactAlternates from "../../components/ContactAlternates";

export default function About({ cta }) {
  const { t } = useTranslation();
  const scheduleCta = getScheduleCta(t);

  return (
    <Container id={t("about:anchor")} className="section-about" align={"center"} halign={"center"}>
      <Row
        halign={"center"}
        style={homeIntroRowStyle}
        columns={[
          {
            cols: { col: 10, sm: 12 },
            content: (
              <>
                <p className="section__badge">{t("about:badge")}</p>
                <h2 className="underline underline--center">{t("about:title")}</h2>
                <div className="big">{parse(t("about:content"))}</div>
              </>
            ),
          },
        ]}
      />
      <Row
        halign={"center"}
        columns={[
          {
            cols: { col: 10, sm: 12 },
            content: (
              <div className="about__cta align align--center">
                <p>
                  <Button
                    variant="primary"
                    href={cta?.link ?? scheduleCta.link}
                    label={cta?.label ?? scheduleCta.label}
                    trackSection="about"
                  />
                </p>
                <ContactAlternates trackSection="about" />
              </div>
            ),
          },
        ]}
      />
    </Container>
  );
}
