import { useTranslation } from "next-i18next/pages";
import { parseHtmlContent } from "../../commons/parseHtmlContent";

import Row from "../../components/Layout/Row";
import Container from "../../components/Layout/Container";
import SectionIntro from "../../components/SectionIntro";
import SectionCta from "../../components/SectionCta";
import { homeCtaRowStyle, homeIntroRowStyle } from "../../commons/pageRowSpacing";
import type { SectionWithCtaProps } from "../../commons/sectionTypes";
import { getScheduleCta } from "../../commons/scheduleCta";
import Button from "../../components/Button";
import Accordion from "../../components/Accordion";

import { PROJECT_LOGOS } from "./logos";

interface TangibleItem {
  id: string;
  title: string;
  content: string;
  "cta-link"?: string;
  "cta-label"?: string;
}

/**
 * Tangible work section. Requires i18n: `tangible`, `common`.
 */
export default function Tangible({ cta, showCta = true }: SectionWithCtaProps) {
  const { t } = useTranslation();
  const scheduleCta = getScheduleCta(t);

  const rawItems = t("tangible:items", { returnObjects: true });
  const items = ((Array.isArray(rawItems) ? rawItems : []) as TangibleItem[]).map((item) => {
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
      logo: Object.hasOwn(PROJECT_LOGOS, item.id) ? PROJECT_LOGOS[item.id] : undefined,
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
            content: <Accordion align={"left"} items={items} trackSection="tangible" />,
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
