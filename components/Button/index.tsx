import Link from "next/link";

import classNames from "classnames";
import type { ElementType, ReactNode } from "react";

import { analyticsText, trackCtaClick, type AnalyticsProperties } from "../../utils/analytics";

function isExternalHref(href: unknown): href is string {
  if (!href || typeof href !== "string") return false;
  return /^(https?:|mailto:|tel:)/i.test(href);
}

function labelToAnalyticsText(label: ReactNode): string | undefined {
  if (typeof label === "string" || typeof label === "number") {
    return analyticsText(label);
  }
  return undefined;
}

type ButtonProps = {
  className?: string;
  tag?: ElementType;
  variant?: string;
  size?: string | null;
  label?: ReactNode;
  href?: string;
  type?: string;
  target?: string;
  trackSection?: string;
  trackProps?: AnalyticsProperties;
};

export default function Button({
  className,
  tag,
  variant = "primary",
  size,
  label,
  href,
  type,
  target,
  trackSection,
  trackProps,
}: ButtonProps) {
  const useNativeAnchor = isExternalHref(href);
  const Tag = tag || (useNativeAnchor ? "a" : Link);
  const variantClass = variant ? `btn--${variant}` : "";

  const handleClick = () => {
    if (!trackSection) return;
    const readableLabel = labelToAnalyticsText(label);
    // Prefer an explicit `label` from trackProps (e.g. quiz result title).
    trackCtaClick(trackSection, {
      ...(readableLabel ? { label: readableLabel } : {}),
      ...trackProps,
    });
  };

  const externalProps =
    useNativeAnchor && href?.startsWith("http")
      ? {
          target: target ?? "_blank",
          rel: "noopener noreferrer",
        }
      : target
        ? { target }
        : {};

  return (
    <Tag
      href={href}
      type={type}
      {...externalProps}
      {...(trackSection ? { onClick: handleClick } : {})}
      className={classNames("btn", className, variantClass, size)}
    >
      {label}
    </Tag>
  );
}
