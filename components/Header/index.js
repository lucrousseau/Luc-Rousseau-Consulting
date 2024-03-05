import classNames from "classnames";

import { alignments } from "../../commons/alignments";

import Row from "../Layout/Row";

import Logo from "../Logo";
import Navigation from "../Navigation";
import SocialLinks from "../SocialLinks";
import LanguageSwitcher from "../LanguageSwitcher";
import Button from "../Button";

import "./style.scss";

export default function Header({ ...props }) {
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
                                  {
                                    className: "component__header__nav",
                                    content: <Navigation />,
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
                                                      <LanguageSwitcher />
                                                    ),
                                                  },
                                                ]}
                                              />
                                            ),
                                          },
                                          {
                                            pull: "right",
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
                                                        label={
                                                          "Réserver une Session"
                                                        }
                                                        href={"#"}
                                                      />
                                                    ),
                                                  },
                                                ]}
                                              />
                                            ),
                                          },
                                        ]}
                                      />
                                    ),
                                  },
                                ]}
                              />
                            ),
                          },
                          {
                            className: "component__header__bars",
                            pull: "right",
                            content: (
                              <>
                                <div></div>
                                <div></div>
                                <div></div>
                              </>
                            ),
                          },
                        ]}
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
