import Link from "next/link";

import { useTranslation } from "next-i18next";

import classNames from "classnames";
import { alignments } from "../../commons/alignments";
import Row from "../Layout/Row";
import "./style.scss";

export default function Navigation({ ...props }) {
  const { t } = useTranslation();
  const alignmentsClass = alignments({ props });

  const navItems = [
    { href: `#${t("tangible:anchor")}`, label: t("tangible:navigation-label") },
    { href: `#${t("why:anchor")}`, label: t("why:navigation-label") },
    { href: `#${t("services:anchor")}`, label: t("services:navigation-label") },
    {
      href: `#${t("technologies:anchor")}`,
      label: t("technologies:navigation-label"),
    },
    { href: `#${t("benefits:anchor")}`, label: t("benefits:navigation-label") },
  ];

  return (
    <nav
      className={classNames(
        "component component__navigation",
        "big",
        alignmentsClass
      )}
    >
      <Row
        tag={"ul"}
        valign={"middle"}
        nowrap={true}
        inline={true}
        columns={navItems.map((item) => ({
          tag: "li",
          auto: true,
          content: <Link href={item.href}>{item.label}</Link>,
        }))}
      />
    </nav>
  );
}
