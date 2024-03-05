import classNames from "classnames";
import { alignments } from "../../commons/alignments";
import Row from "../Layout/Row";
import "./style.scss";

export default function LanguageSwitcher({ current = "en", ...props }) {
  const alignmentsClass = alignments({ props });

  const languages = [
    { code: "en", label: "English" },
    { code: "fr", label: "French" },
  ];

  return (
    <div
      className={classNames(
        "component component__language-switcher",
        alignmentsClass
      )}
    >
      <Row
        tag={"ul"}
        halign={"middle"}
        columns={languages.map((language) => ({
          tag: "li",
          auto: true,
          className: classNames("component__language-switcher__lang", {
            "component__language-switcher__lang--current":
              current === language.code,
          }),
          content: (
            <a href="#" aria-label={language.label}>
              {language.code.toUpperCase()}
            </a>
          ),
        }))}
      />
    </div>
  );
}
