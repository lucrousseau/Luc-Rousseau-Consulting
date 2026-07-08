import classNames from "classnames";
import { useTranslation } from "next-i18next/pages";

export default function ContactAlternates({
  className,
  trackSection,
  hideLinkedIn = false,
  align = "center",
}) {
  const { t } = useTranslation("common");

  const handleClick = (variant) => () => {
    if (!trackSection) return;
    import("@vercel/analytics")
      .then(({ track }) => {
        if (typeof track === "function") {
          track("cta_click", { section: `${trackSection}:${variant}` });
        }
      })
      .catch(() => {});
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
