import Link from "next/link";

import classNames from "classnames";
import { alignments } from "../../commons/alignments";
import Row from "../Layout/Row";

/**
 * @param {object} props
 * @param {{ href: string; label: import('react').ReactNode }[]} [props.navigation]
 * @param {string} [props.align]
 * @param {string} [props.halign]
 * @param {string} [props.valign]
 */
export default function Navigation({ navigation = [], ...props }) {
  const alignmentsClass = alignments({ props });

  return (
    <nav className={classNames("component component__navigation", "big", alignmentsClass)}>
      <Row
        tag={"ul"}
        valign={"middle"}
        nowrap={true}
        inline={true}
        columns={navigation.map((item) => ({
          tag: "li",
          auto: true,
          content: <Link href={item.href}>{item.label}</Link>,
        }))}
      />
    </nav>
  );
}
