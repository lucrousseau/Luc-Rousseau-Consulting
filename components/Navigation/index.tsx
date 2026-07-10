import Link from "next/link";

import classNames from "classnames";
import type { ReactNode } from "react";

import { alignments, type AlignmentProps } from "../../commons/alignments";
import Row from "../Layout/Row";

type NavigationItem = {
  href: string;
  label: ReactNode;
};

type NavigationProps = AlignmentProps & {
  navigation?: NavigationItem[];
};

export default function Navigation({ navigation = [], ...props }: NavigationProps) {
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
