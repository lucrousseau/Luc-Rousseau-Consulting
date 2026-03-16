import classNames from "classnames";
import { useTranslation } from "next-i18next";

import { alignments } from "../../commons/alignments";

import Button from "../Button";

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
  const showPrice = price != null && typeof price === "number" && price > 0;
  const priceFormatted = showPrice
    ? new Intl.NumberFormat(`${i18n.language}-CA`, {
        style: "currency",
        currency: "CAD",
      }).format(price)
    : null;

  return (
    <p
      className={classNames("component component__buy", className, alignmentsClass)}
      data-price={price}
    >
      <span>
        {legend}{" "}
        {showPrice && (
          <>
            <strong>{priceFormatted}</strong> {prefix && <> {prefix}</>}
          </>
        )}
      </span>
      <Button href={t("schedule-me")} size={size} variant={variant} label={label} />
    </p>
  );
}
