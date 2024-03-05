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
    { href: t("#projects"), label: t("projects") },
    { href: t("#why"), label: t("why") },
    { href: t("#services"), label: t("services") },
    { href: t("#development"), label: t("development") },
    { href: t("#advantages"), label: t("advantages") },
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
