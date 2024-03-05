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
    { href: `#${t("_projects")}`, label: t("projects") },
    { href: `#${t("_why")}`, label: t("why") },
    { href: `#${t("_services")}`, label: t("services") },
    { href: `#${t("_development")}`, label: t("development") },
    { href: `#${t("_advantages")}`, label: t("advantages") },
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
