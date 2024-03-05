import Link from "next/link";
import classNames from "classnames";
import { alignments } from "../../commons/alignments";
import Row from "../Layout/Row";
import "./style.scss";

export default function Navigation({ ...props }) {
  const alignmentsClass = alignments({ props });

  const navItems = [
    { href: "#aboutme", label: "À Propos" },
    { href: "#projects", label: "Projets" },
    { href: "#pourquoi", label: "pourquoi" },
    { href: "#services", label: "Services" },
    { href: "#avantages", label: "Avantages" },
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
