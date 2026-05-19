import { useTranslation } from "next-i18next";
import parse from "html-react-parser";

import Row from "../../components/Layout/Row";
import Container from "../../components/Layout/Container";
import { homeCtaRowStyle, homeIntroRowStyle } from "../../commons/pageRowSpacing";
import { getScheduleCta } from "../../commons/scheduleCta";
import Button from "../../components/Button";
import ContactAlternates from "../../components/ContactAlternates";

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
      <Row
        halign={"center"}
        style={homeIntroRowStyle}
        columns={[
          {
            cols: { col: 11, xl: 12, sm: 12 },
            content: (
              <>
                <p className="section__badge">{t("who-i-work-with:badge")}</p>
                <h2 className="underline underline--center">{t("who-i-work-with:title")}</h2>
                {parse(t("who-i-work-with:summary"))}
              </>
            ),
          },
        ]}
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
                        <>
                          <p>
                            <Button
                              variant={"primary"}
                              href={cta?.link ?? scheduleCta.link}
                              label={cta?.label ?? t("who-i-work-with:footer-cta-label")}
                              trackSection={"who-i-work-with"}
                            />
                          </p>
                          <ContactAlternates trackSection="who-i-work-with" />
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
