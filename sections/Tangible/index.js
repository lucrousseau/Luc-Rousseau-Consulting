import { useTranslation } from "next-i18next";
import parse from "html-react-parser";

import Row from "../../components/Layout/Row";
import Container from "../../components/Layout/Container";

import Button from "../../components/Button";
import ContactAlternates from "../../components/ContactAlternates";
import Accordion from "../../components/Accordion";

import milesopediaLogo from "./images/milesopedia.png";
import nestoLogo from "./images/nesto.png";
import comparemortgageLogo from "./images/comparemortgage.png";
import nestogroupLogo from "./images/nestogroup.png";

const PROJECT_LOGOS = [milesopediaLogo, nestoLogo, comparemortgageLogo, nestogroupLogo];

export default function Tangible({ cta }) {
  const { t } = useTranslation();

  const items = t("tangible:items", { returnObjects: true }).map((item, index) => {
    const content = (
      <>
        {parse(item.content)}

        {item["cta-link"] && item["cta-label"] && (
          <p className="align align--right">
            <Button
              variant={"secondary"}
              size={"small"}
              target={"_blank"}
              href={item["cta-link"]}
              label={item["cta-label"]}
            />
          </p>
        )}
      </>
    );

    return {
      title: item.title,
      // index from .map over static locale items
      // eslint-disable-next-line security/detect-object-injection
      logo: PROJECT_LOGOS[index] ?? null,
      content: content,
    };
  });

  return (
    <Container
      id={t("tangible:anchor")}
      className="section-tangible"
      align={"center"}
      halign={"center"}
    >
      <Row
        halign={"center"}
        style={{
          "--padding-bottom": "2rem",
          "--sm-padding-bottom": "2rem",
        }}
        columns={[
          {
            cols: { col: 11, xl: 12, sm: 12 },
            content: (
              <>
                <p className="section__badge">{t("tangible:badge")}</p>
                <h2 className="underline underline--center">{t("tangible:title")}</h2>
                {parse(t("tangible:summary"))}
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
        style={{
          "--padding-top": "2rem",
          "--sm-padding-top": "2rem",
        }}
        columns={[
          {
            cols: { col: 10, sm: 12 },
            content: (
              <div className="align align--center tangible__cta-block">
                {t("tangible:ctaTeaser") && (
                  <p className="big tangible__cta-teaser">{parse(t("tangible:ctaTeaser"))}</p>
                )}
                <p>
                  <Button
                    variant={"primary"}
                    label={cta?.label ?? t("tangible:footer-cta-label")}
                    href={cta?.link ?? t("common:schedule-me")}
                    trackSection={"tangible"}
                  />
                </p>
                <ContactAlternates trackSection="tangible" />
              </div>
            ),
          },
        ]}
      />
    </Container>
  );
}
