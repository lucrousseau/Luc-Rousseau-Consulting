import { useTranslation } from "next-i18next";
import parse from "html-react-parser";

import TechnicalStack from "../TechnicalStack";
import { getScheduleCta } from "../../commons/scheduleCta";

/**
 * Technologies section. Requires i18n: `technologies`, `common`.
 * @param {import('../../commons/sectionTypes').SectionWithBackgroundProps} props
 */
export default function Technologies({ backgroundColor, cta }) {
  const { t } = useTranslation();
  const scheduleCta = getScheduleCta(t);

  return (
    <TechnicalStack
      id={t("technologies:anchor")}
      badge={t("technologies:badge")}
      title={t("technologies:title")}
      lede={parse(t("technologies:summary"))}
      items={t("technologies:items", { returnObjects: true })}
      footerCta={{
        label: cta?.label ?? t("technologies:footer-cta-label"),
        href: cta?.link ?? scheduleCta.link,
        trackSection: "technologies",
      }}
      backgroundColor={backgroundColor}
    />
  );
}
