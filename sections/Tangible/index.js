import { useTranslation } from "next-i18next/pages";
import { parseHtmlContent } from "../../commons/parseHtmlContent";

import Row from "../../components/Layout/Row";
import Container from "../../components/Layout/Container";
import SectionIntro from "../../components/SectionIntro";
import SectionCta from "../../components/SectionCta";
import { homeCtaRowStyle, homeIntroRowStyle } from "../../commons/pageRowSpacing";
import { getScheduleCta } from "../../commons/scheduleCta";
import Button from "../../components/Button";
import Accordion from "../../components/Accordion";

import milesopediaLogo from "./images/milesopedia.png";
import nestoLogo from "./images/nesto.png";
import comparemortgageLogo from "./images/comparemortgage.png";
import nestogroupLogo from "./images/nestogroup.png";

/** Order matches `tangible.json` items (Milesopedia → Nesto → Compare → BrightWize). */
const PROJECT_LOGOS = [milesopediaLogo, nestoLogo, comparemortgageLogo, nestogroupLogo];

/**
 * Tangible work section. Requires i18n: `tangible`, `common`.
 * @param {import('../../commons/sectionTypes').SectionWithCtaProps} props
 */
export default function Tangible({ cta, showCta = true }) {
  const { t } = useTranslation();
  const scheduleCta = getScheduleCta(t);

  const items =
    /** @type {{ title: string; content: string; "cta-link"?: string; "cta-label"?: string }[]} */ (
      t("tangible:items", { returnObjects: true })
    ).map((item, index) => {
      const content = (
        <>
          {parseHtmlContent(item.content)}

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
      <SectionIntro
        badge={t("tangible:badge")}
        title={t("tangible:title")}
        lede={parseHtmlContent(t("tangible:summary"))}
        rowStyle={homeIntroRowStyle}
      />
      <Row
        columns={[
          {
            cols: { col: 10, sm: 12 },
            content: <Accordion align={"left"} items={items} />,
          },
        ]}
      />
      {showCta && (
        <SectionCta
          halign="center"
          trackSection="tangible"
          href={cta?.link ?? scheduleCta.link}
          label={cta?.label ?? t("tangible:footer-cta-label")}
          rowStyle={homeCtaRowStyle}
          className="tangible__cta-block"
          teaser={
            t("tangible:ctaTeaser") ? (
              <p className="big tangible__cta-teaser">
                {parseHtmlContent(t("tangible:ctaTeaser"))}
              </p>
            ) : null
          }
        />
      )}
    </Container>
  );
}
