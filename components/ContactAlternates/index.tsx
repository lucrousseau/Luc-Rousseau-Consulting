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

  const handleClick = (label: string) => () => {
    if (!trackSection) return;
    trackCtaClick(trackSection, { ...trackProps, label });
  };

  const linkedInLabel = t("linkedin-contact-label");
  const emailLabel = t("contact-email-display");

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
            onClick={handleClick(linkedInLabel)}
          >
            {linkedInLabel}
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
        onClick={handleClick(emailLabel)}
      >
        {emailLabel}
      </a>
    </span>
  );
}
