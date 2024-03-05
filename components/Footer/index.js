import classNames from "classnames";

import { alignments } from "../../commons/alignments";

import Row from "../Layout/Row";

export default function Footer({ ...props }) {
  const alignmentsClass = alignments({ props });

  return (
    <div className={classNames("component component__footer", alignmentsClass)}>
      <Row
        halign={"center"}
        columns={[
          {
            cols: { col: 11, xl: 12 },
            content: (
              <Row
                columns={[
                  {
                    content: (
                      <p>
                        <small>2024 © Luc Rousseau</small>
                      </p>
                    ),
                  },
                  {
                    pull: "right",
                    content: (
                      <p>
                        <small>Have an Happy Day</small>
                      </p>
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
