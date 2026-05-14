import { useTranslation } from "next-i18next";
import parse from "html-react-parser";

import Row from "../../components/Layout/Row";
import Container from "../../components/Layout/Container";
import { homeCtaRowStyle, homeIntroRowStyle } from "../../commons/homePageRowSpacing";
import Accordion from "../../components/Accordion";
import Button from "../../components/Button";
import ContactAlternates from "../../components/ContactAlternates";

export default function HomeFaq({ cta }) {
  const { t } = useTranslation();

  const items = t("faq:items", { returnObjects: true }).map((item) => ({
    title: item.title,
    content: parse(item.content),
  }));

  return (
    <Container id={t("faq:anchor")} className="section-home-faq" align={"center"} halign={"center"}>
      <Row
        halign={"center"}
        style={homeIntroRowStyle}
        columns={[
          {
            cols: { col: 11, xl: 12, sm: 12 },
            content: (
              <>
                <p className="section__badge">{t("faq:badge")}</p>
                <h2 className="underline underline--center">{t("faq:title")}</h2>
                {parse(t("faq:intro"))}
              </>
            ),
          },
        ]}
      />
      <Row
        columns={[
          {
            cols: { col: 10, sm: 12 },
            content: <Accordion align={"left"} items={items} />,
          },
        ]}
      />
      <Row
        halign={"center"}
        style={homeCtaRowStyle}
        columns={[
          {
            cols: { col: 10, sm: 12 },
            content: (
              <div className="align align--center section-home-faq__cta">
                <p>
                  <Button
                    variant={"primary"}
                    href={cta?.link ?? t("common:schedule-me")}
                    label={cta?.label ?? t("common:schedule-me-label")}
                    trackSection={"faq"}
                  />
                </p>
                <ContactAlternates trackSection="faq" />
              </div>
            ),
          },
        ]}
      />
    </Container>
  );
}
