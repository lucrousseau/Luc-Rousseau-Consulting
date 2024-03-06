import classNames from "classnames";

import { useTranslation } from "next-i18next";

import { alignments } from "../../commons/alignments";

import Button from "../Button";

import "./style.scss";

export default function Buy({ className, price, legend, label, ...props }) {
  const { t } = useTranslation();
  const alignmentsClass = alignments({ props });

  return (
    <div
      className={classNames(
        "component component__buy",
        className,
        alignmentsClass
      )}
      data-price={price}
    >
      <span>{legend}</span>
      <Button
        variant={"secondary"}
        size={"small"}
        href={`mailto:${t("hello@lucrousseau.com")}`}
        label={label}
      />
    </div>
  );
}
