import Link from "next/link";

import classNames from "classnames";
import { alignments } from "../../commons/alignments";
import Row from "../Layout/Row";

export default function Navigation({ ...props }) {
  const { navigation = {} } = props;
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
