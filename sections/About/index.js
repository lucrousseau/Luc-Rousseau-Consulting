import { useTranslation } from "next-i18next";
import parse from "html-react-parser";

import Row from "../../components/Layout/Row";
import Container from "../../components/Layout/Container";
import Button from "../../components/Button";
import ContactAlternates from "../../components/ContactAlternates";

export default function About() {
  const { t } = useTranslation();

  return (
    <Container id={t("about:anchor")} className="section-about" align={"center"} halign={"center"}>
      <Row
        halign={"center"}
        columns={[
          {
            cols: { col: 10, sm: 12 },
            content: (
              <>
                <p className="section__badge">{t("about:badge")}</p>
                <h2 className="underline underline--center">{t("about:title")}</h2>
                <div className="big">{parse(t("about:content"))}</div>
                <p className="about__cta">
                  <Button
                    variant="primary"
                    href={t("common:linkedin")}
                    label={t("about:ctaLinkedinLabel")}
                    target="_blank"
                  />
                </p>
                <ContactAlternates hideLinkedIn trackSection="about" />
              </>
            ),
          },
        ]}
      />
    </Container>
  );
}
