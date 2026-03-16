import classNames from "classnames";
import { alignments } from "../../commons/alignments";
import Calendar from "./calendar";

import "./style.scss";

export default function Booking({ className, ...props }) {
  const alignmentsClass = alignments({ props });

  return (
    <div className={classNames("component component__booking", className, alignmentsClass)}>
      <form action="/" method="post">
        <Calendar />
      </form>
    </div>
  );
}
