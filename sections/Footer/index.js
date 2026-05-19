import classNames from "classnames";
import Link from "next/link";

import { alignments } from "../../commons/alignments";

import { useTranslation } from "next-i18next";

import Row from "../../components/Layout/Row";

/** Site footer. Requires i18n: `common`. */
export default function Footer({ showGuidesLink = false, ...props }) {
  const { t } = useTranslation();
  const alignmentsClass = alignments({ props });

  return (
    <div className={classNames("component component__footer", alignmentsClass)}>
      <Row
        halign={"center"}
        columns={[
          {
            cols: { col: 11, xl: 12 },
            content: (
              <>
                {showGuidesLink && (
                  <p className="component__footer__guides">
                    <Link href="/guides">{t("common:guides-link-label")}</Link>
                  </p>
                )}
                <Row
                  columns={[
                    {
                      pull: "left",
                      content: (
                        <small>
                          {new Date().getFullYear()} ©{" "}
                          <a href={t("hello@lucrousseau.com")}>Luc Rousseau</a>
                        </small>
                      ),
                    },
                    {
                      pull: "right",
                      className: "align align--right",
                      content: <small>{t("have-good-day")}</small>,
                    },
                  ]}
                />
              </>
            ),
          },
        ]}
      />
    </div>
  );
}
