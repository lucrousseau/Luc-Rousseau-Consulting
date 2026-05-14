import classNames from "classnames";
import { alignments } from "../../commons/alignments";
import Row from "../Layout/Row";
import { setLocalePreferenceClient } from "../../utils/setLocalePreferenceClient";

export default function LanguageSwitcher({ current = "fr", ...props }) {
  const alignmentsClass = alignments({ props });

  /** Default locale is `fr` (see `next-i18next.config.js`): FR at `/`, EN at `/en`. */
  const languages = {
    en: { label: "English", href: "/en" },
    fr: { label: "French", href: "/" },
  };

  // safe: current is locale prop ("en" | "fr"), fallback to default site locale
  // eslint-disable-next-line security/detect-object-injection
  const currentLanguage = languages[current] ?? languages.fr;

  return (
    <div className={classNames("component component__language-switcher", alignmentsClass)}>
      <Row
        tag={"ul"}
        halign={"middle"}
        columns={[
          {
            tag: "li",
            auto: true,
            className: classNames(
              "component__language-switcher__lang",
              "component__language-switcher__lang--current"
            ),
            content: (
              <a
                href={currentLanguage.href}
                aria-label={currentLanguage.label}
                onClick={() => setLocalePreferenceClient(current)}
              >
                {current.toUpperCase()}
              </a>
            ),
          },
        ]}
      />
    </div>
  );
}
