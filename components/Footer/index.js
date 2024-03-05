import classNames from "classnames";

import { alignments } from "../../commons/alignments";

import { useTranslation } from "next-i18next";

import Row from "../Layout/Row";
import moment from "moment";

export default function Footer({ ...props }) {
  const { t } = useTranslation();
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
                        <small>{moment().format("YYYY")} © Luc Rousseau</small>
                      </p>
                    ),
                  },
                  {
                    pull: "right",
                    content: (
                      <p>
                        <small>{t("have-good-day")}</small>
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
