import classNames from "classnames";

import { alignments } from "../../commons/alignments";

import { useTranslation } from "next-i18next";

import Row from "../../components/Layout/Row";
import Navigation from "../../components/Navigation";
import { getSiteNavigationItems } from "../../commons/siteNavigation";

/** Site footer. Requires i18n: `common`. */
export default function Footer({ ...props }) {
  const { t } = useTranslation("common");
  const alignmentsClass = alignments({ props });
  const navItems = getSiteNavigationItems(t);

  return (
    <div className={classNames("component component__footer", alignmentsClass)}>
      <Row
        halign={"center"}
        columns={[
          {
            cols: { col: 11, xl: 12 },
            content: (
              <>
                <Row
                  className="component__footer__nav"
                  halign={"center"}
                  columns={[
                    {
                      cols: { col: 11, xl: 12 },
                      content: <Navigation navigation={navItems} />,
                    },
                  ]}
                />
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
