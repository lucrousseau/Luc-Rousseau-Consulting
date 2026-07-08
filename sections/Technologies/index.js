import { useTranslation } from "next-i18next/pages";
import { parseHtmlContent } from "../../commons/parseHtmlContent";

import TechnicalStack from "../TechnicalStack";
import { getScheduleCta } from "../../commons/scheduleCta";

/**
 * Technologies section. Requires i18n: `technologies`, `common`.
 * @param {import('../../commons/sectionTypes').SectionWithBackgroundProps} props
 */
export default function Technologies({ backgroundColor, cta, showCta = true }) {
  const { t } = useTranslation();
  const scheduleCta = getScheduleCta(t);

  return (
    <TechnicalStack
      id={t("technologies:anchor")}
      badge={t("technologies:badge")}
      title={t("technologies:title")}
      lede={parseHtmlContent(t("technologies:summary"))}
      items={t("technologies:items", { returnObjects: true })}
      footerCta={
        showCta
          ? {
              label: cta?.label ?? t("technologies:footer-cta-label"),
              href: cta?.link ?? scheduleCta.link,
              trackSection: "technologies",
            }
          : null
      }
      backgroundColor={backgroundColor}
    />
  );
}
