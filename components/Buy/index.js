import classNames from "classnames";
import { useTranslation } from "next-i18next";

import { alignments } from "../../commons/alignments";

import Button from "../Button";

import "./style.scss";

export default function Buy({
  className,
  price,
  legend,
  prefix,
  label,
  size = "small",
  variant = "secondary",
  ...props
}) {
  const { t, i18n } = useTranslation();
  const alignmentsClass = alignments({ props });
  const priceFormatted = new Intl.NumberFormat(`${i18n.language}-CA`, {
    style: "currency",
    currency: "CAD",
  }).format(price);

  return (
    <p
      className={classNames(
        "component component__buy",
        className,
        alignmentsClass
      )}
      data-price={price}
    >
      <span>
        {legend}{" "}
        {price && (
          <>
            <strong>{priceFormatted}</strong>
            {prefix && <> {prefix}</>}
          </>
        )}
      </span>
      <Button
        href={t("schedule-me")}
        size={size}
        variant={variant}
        label={label}
      />
    </p>
  );
}
