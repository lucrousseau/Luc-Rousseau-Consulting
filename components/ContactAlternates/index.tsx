import classNames from "classnames";
import { useTranslation } from "next-i18next/pages";

import type { AlignmentProps } from "../../commons/alignments";
import { trackCtaClick, type AnalyticsProperties } from "../../utils/analytics";

type ContactAlternatesProps = AlignmentProps & {
  className?: string;
  trackSection?: string;
  trackProps?: AnalyticsProperties;
  hideLinkedIn?: boolean;
};

export default function ContactAlternates({
  className,
  trackSection,
  trackProps,
  hideLinkedIn = false,
  align = "center",
}: ContactAlternatesProps) {
  const { t } = useTranslation("common");

  const handleClick = (variant: string) => () => {
    if (!trackSection) return;
    trackCtaClick(`${trackSection}:${variant}`, trackProps);
  };

  return (
    <span
      className={classNames(
        "contact-alternates",
        align === "center" && "contact-alternates--center",
        className
      )}
    >
      {!hideLinkedIn && (
        <>
          <a
            className="contact-alternates__link"
            href={t("linkedin")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClick("linkedin")}
          >
            {t("linkedin-contact-label")}
          </a>
          <span className="contact-alternates__sep" aria-hidden="true">
            {" "}
            ·{" "}
          </span>
        </>
      )}
      <a
        className="contact-alternates__link"
        href={t("contact-email-mailto")}
        onClick={handleClick("email")}
      >
        {t("contact-email-display")}
      </a>
    </span>
  );
}
