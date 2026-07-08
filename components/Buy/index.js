import classNames from "classnames";
import { useTranslation } from "next-i18next/pages";

import { alignments } from "../../commons/alignments";
import { getScheduleCta } from "../../commons/scheduleCta";

import SectionCta from "../SectionCta";

/**
 * Price/legend block with a schedule CTA. Reuses {@link SectionCta} for Button +
 * ContactAlternates (same Calendly path as sections); keeps its own layout because
 * of inline pricing copy alongside the schedule CTA.
 */
export default function Buy({
  className,
  price,
  legend,
  prefix,
  label,
  href,
  size = "small",
  variant = "secondary",
  trackSection,
  ...props
}) {
  const { t, i18n } = useTranslation();
  const scheduleCta = getScheduleCta(t);
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
      <SectionCta
        wrapRow={false}
        bare
        wrapButtonInP={false}
        showContactAlternates={Boolean(trackSection)}
        trackSection={trackSection}
        href={href ?? scheduleCta.link}
        label={label ?? scheduleCta.label}
        variant={variant}
        size={size}
      />
    </p>
  );
}
