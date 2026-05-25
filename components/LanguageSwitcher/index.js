import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";

import { alignments } from "../../commons/alignments";
import { resolveLocaleSwitchPath } from "../../commons/siteRoutes";
import Row from "../Layout/Row";

const LANGUAGE_LABELS = {
  en: "English",
  fr: "French",
};

export default function LanguageSwitcher({ current: targetLocale = "fr", ...props }) {
  const alignmentsClass = alignments({ props });
  const router = useRouter();

  // `targetLocale` is the locale to switch to (see Header), not the active locale.
  // eslint-disable-next-line security/detect-object-injection
  const label = LANGUAGE_LABELS[targetLocale] ?? LANGUAGE_LABELS.fr;

  const switchPath = resolveLocaleSwitchPath(router.asPath, targetLocale) ?? router.asPath;

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
              <Link href={switchPath} locale={targetLocale} aria-label={label}>
                {targetLocale.toUpperCase()}
              </Link>
            ),
          },
        ]}
      />
    </div>
  );
}
