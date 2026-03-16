import classNames from "classnames";
import { alignments } from "../../commons/alignments";
import Row from "../Layout/Row";

export default function LanguageSwitcher({ current = "en", ...props }) {
  const alignmentsClass = alignments({ props });

  const languages = {
    en: { label: "English", href: "/" },
    fr: { label: "French", href: "/fr" },
  };

  // safe: current is locale prop ("en" | "fr"), fallback to en
  // eslint-disable-next-line security/detect-object-injection
  const currentLanguage = languages[current] ?? languages.en;

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
              <a href={currentLanguage.href} aria-label={currentLanguage.label}>
                {current.toUpperCase()}
              </a>
            ),
          },
        ]}
      />
    </div>
  );
}
