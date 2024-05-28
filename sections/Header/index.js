import classNames from "classnames";

import { alignments } from "../../commons/alignments";

import { useTranslation } from "next-i18next";

import Row from "../../components/Layout/Row";

import Logo from "../../components/Logo";
import Navigation from "../../components/Navigation";
import SocialLinks from "../../components/SocialLinks";
import LanguageSwitcher from "../../components/LanguageSwitcher";
import Button from "../../components/Button";

import "./style.scss";

export default function Header({ ...props }) {
  const { navigation, cta } = props;
  const { t, i18n } = useTranslation();
  const lang = i18n.language === "en" ? "fr" : "en";
  const alignmentsClass = alignments({ props });

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
                    cols: { sm: 0 },
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
                                  navigation !== false && {
                                    className: "component__header__nav",
                                    content: (
                                      <Navigation navigation={navigation} />
                                    ),
                                  },
                                  {
                                    className: "component__header__right",
                                    pull: "right",
                                    content: (
                                      <Row
                                        valign={"middle"}
                                        columns={[
                                          {
                                            className:
                                              "component__header__tools",
                                            content: (
                                              <Row
                                                valign={"middle"}
                                                columns={[
                                                  {
                                                    content: <SocialLinks />,
                                                  },
                                                  {
                                                    content: (
                                                      <LanguageSwitcher
                                                        current={lang}
                                                      />
                                                    ),
                                                  },
                                                ]}
                                              />
                                            ),
                                          },
                                          cta !== false && {
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
                                                        href={t(
                                                          "hello@lucrousseau.com"
                                                        )}
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
