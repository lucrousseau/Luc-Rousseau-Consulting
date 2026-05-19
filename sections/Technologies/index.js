import { useTranslation } from "next-i18next";
import parse from "html-react-parser";

import Row from "../../components/Layout/Row";
import Container from "../../components/Layout/Container";
import { homeCtaRowStyle, homeIntroRowStyle } from "../../commons/pageRowSpacing";
import { getScheduleCta } from "../../commons/scheduleCta";

import Button from "../../components/Button";
import ContactAlternates from "../../components/ContactAlternates";
import Tags from "../../components/Tags";

export default function Technologies({ backgroundColor, cta }) {
  const { t } = useTranslation();
  const scheduleCta = getScheduleCta(t);

  const items = t("technologies:items", { returnObjects: true }).map((item) => ({
    content: item,
    emoji: "⭐️",
  }));

  return (
    <Container
      id={t("technologies:anchor")}
      align={"center"}
      halign={"center"}
      backgroundColor={backgroundColor}
    >
      <Row
        halign={"center"}
        style={homeIntroRowStyle}
        columns={[
          {
            cols: { col: 11, xl: 12, sm: 12 },
            content: (
              <>
                <p className="section__badge">{t("technologies:badge")}</p>
                <h2 className="underline underline--center">{t("technologies:title")}</h2>
                {parse(t("technologies:summary"))}
              </>
            ),
          },
        ]}
      />
      <Row
        columns={[
          {
            cols: { col: 10, sm: 12 },
            content: <Tags halign={"center"} items={items} />,
          },
        ]}
      />
      <Row
        style={homeCtaRowStyle}
        columns={[
          {
            content: (
              <>
                <p>
                  <Button
                    variant={"primary"}
                    href={cta?.link ?? scheduleCta.link}
                    label={cta?.label ?? t("technologies:footer-cta-label")}
                    trackSection={"technologies"}
                  />
                </p>
                <ContactAlternates trackSection="technologies" />
              </>
            ),
          },
        ]}
      />
    </Container>
  );
}
