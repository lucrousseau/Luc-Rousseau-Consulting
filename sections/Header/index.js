import classNames from "classnames";

import { alignments } from "../../commons/alignments";

import { useTranslation } from "next-i18next/pages";

import Row from "../../components/Layout/Row";

import Logo from "../../components/Logo";
import Navigation from "../../components/Navigation";
import SocialLinks from "../../components/SocialLinks";
import LanguageSwitcher from "../../components/LanguageSwitcher";
import Button from "../../components/Button";
import { getSiteNavigationItems } from "../../commons/siteNavigation";

/**
 * Site header (logo, optional nav, social, language, contact CTA).
 *
 * @param {object} props
 * @param {boolean} [props.showNavigation=true] - Render main navigation
 * @param {boolean} [props.showCta=true] - Render contact email button
 * @param {boolean} [props.showSocial=true] - Render social links
 * @param {Array} [props.navigation=[]] - Nav items when showNavigation is true
 */
export default function Header({
  showNavigation = true,
  showCta = true,
  showSocial = true,
  navigation = [],
  ...props
}) {
  const { t, i18n } = useTranslation("common");
  const lang = i18n.language === "en" ? "fr" : "en";
  const alignmentsClass = alignments({ props });
  const navItems = navigation.length > 0 ? navigation : getSiteNavigationItems(t);

  return (
    <div className={classNames("component component__header", alignmentsClass)}>
      <Row
        halign={"center"}
        columns={[
          {
            cols: { col: 11, xl: 12 },
            content: (
              <Row
                valign={"middle"}
                columns={[
                  {
                    pull: "left",
                    content: <Logo />,
                  },
                  {
                    content: (
                      <Row
                        valign={"middle"}
                        columns={[
                          {
                            content: (
                              <Row
                                valign={"middle"}
                                halign={"right"}
                                columns={[
                                  showNavigation && {
                                    className: "component__header__nav",
                                    content: <Navigation navigation={navItems} />,
                                  },
                                  {
                                    className: "component__header__right",
                                    pull: "right",
                                    content: (
                                      <Row
                                        valign={"middle"}
                                        columns={[
                                          {
                                            className: "component__header__tools",
                                            content: (
                                              <Row
                                                valign={"middle"}
                                                columns={[
                                                  showSocial && {
                                                    content: <SocialLinks />,
                                                  },
                                                  {
                                                    content: <LanguageSwitcher current={lang} />,
                                                  },
                                                ].filter(Boolean)}
                                              />
                                            ),
                                          },
                                          showCta && {
                                            pull: "right",
                                            cols: { xs: 0 },
                                            content: (
                                              <Row
                                                valign={"middle"}
                                                columns={[
                                                  {
                                                    pull: "right",
                                                    content: (
                                                      <Button
                                                        variant={"primary"}
                                                        size={"small"}
                                                        label={t("contact-me")}
                                                        href={t("hello@lucrousseau.com")}
                                                      />
                                                    ),
                                                  },
                                                ]}
                                              />
                                            ),
                                          },
                                        ].filter(Boolean)}
                                      />
                                    ),
                                  },
                                ].filter(Boolean)}
                              />
                            ),
                          },
                        ].filter(Boolean)}
                      />
                    ),
                  },
                ]}
              />
            ),
          },
        ]}
      />
    </div>
  );
}
