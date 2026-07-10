import { useTranslation } from "next-i18next/pages";
import { parseHtmlContent } from "../../commons/parseHtmlContent";

import TechnicalStack from "../TechnicalStack";
import type { SectionWithBackgroundProps } from "../../commons/sectionTypes";
import { getScheduleCta } from "../../commons/scheduleCta";

/** Technologies section. Requires i18n: `technologies`, `common`. */
export default function Technologies({
  backgroundColor,
  cta,
  showCta = true,
}: SectionWithBackgroundProps) {
  const { t } = useTranslation();
  const scheduleCta = getScheduleCta(t);
  const rawItems = t("technologies:items", { returnObjects: true });
  const items = (Array.isArray(rawItems) ? rawItems : []) as string[];

  return (
    <TechnicalStack
      id={t("technologies:anchor")}
      badge={t("technologies:badge")}
      title={t("technologies:title")}
      lede={parseHtmlContent(t("technologies:summary"))}
      items={items}
      footerCta={
        showCta
          ? {
              label: cta?.label ?? t("technologies:footer-cta-label"),
              href: cta?.link ?? scheduleCta.link,
              trackSection: "technologies",
            }
          : undefined
      }
      backgroundColor={backgroundColor}
    />
  );
}
