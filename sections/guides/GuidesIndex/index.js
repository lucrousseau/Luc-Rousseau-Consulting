import Link from "next/link";
import { useTranslation } from "next-i18next";
import parse from "html-react-parser";

import Row from "../../../components/Layout/Row";
import Container from "../../../components/Layout/Container";
import SectionIntro from "../../../components/SectionIntro";
import { homeIntroRowStyle } from "../../../commons/pageRowSpacing";
import { GUIDES } from "../../../commons/guidesManifest";

/**
 * Lists all published guides. Requires i18n: `guides-index`.
 */
export default function GuidesIndex() {
  const { t } = useTranslation("guides-index");

  return (
    <Container className="section-guides-index" align="center" halign="center">
      <SectionIntro
        badge={t("guides-index:badge")}
        title={t("guides-index:title")}
        lede={parse(t("guides-index:lede"))}
        rowStyle={homeIntroRowStyle}
      />
      <Row
        halign="center"
        columns={[
          {
            cols: { col: 10, sm: 12 },
            content: (
              <ul className="guides-index__list">
                {GUIDES.map((guide) => (
                  <li key={guide.slug} className="guides-index__item">
                    <Link href={`/guides/${guide.slug}`} className="guides-index__link">
                      <strong>{t(`guides-index:guides.${guide.slug}.title`)}</strong>
                    </Link>
                    <p className="big">{t(`guides-index:guides.${guide.slug}.teaser`)}</p>
                  </li>
                ))}
              </ul>
            ),
          },
        ]}
      />
    </Container>
  );
}
