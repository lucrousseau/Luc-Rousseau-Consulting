import classNames from "classnames";

import { alignments } from "../../commons/alignments";

import { useTranslation } from "next-i18next";

import Row from "../../components/Layout/Row";
import moment from "moment";

export default function Footer({ ...props }) {
  const { t } = useTranslation();
  const alignmentsClass = alignments({ props });

  const getEmail = (email) => {
    const startIndex = email.indexOf(":");
    const endIndex = email.indexOf("?");
    if (startIndex !== -1 && endIndex !== -1) {
      return email.substring(startIndex + 1, endIndex);
    }
    return email;
  };

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
                    cols: { col: 6, xs: 12 },
                    content: (
                      <small>
                        {moment().format("YYYY")}©{" | "}
                        <a href={t("hello@lucrousseau.com")}>Luc Rousseau</a>
                      </small>
                    ),
                  },
                  {
                    cols: { col: 6, xs: 12 },
                    className: "align--right",
                    content: <small>{t("have-good-day")}</small>,
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
