import Link from "next/link";

import classNames from "classnames";
import type { ElementType, ReactNode } from "react";

function isExternalHref(href: unknown): href is string {
  if (!href || typeof href !== "string") return false;
  return /^(https?:|mailto:|tel:)/i.test(href);
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
}: ButtonProps) {
  const useNativeAnchor = isExternalHref(href);
  const Tag = tag || (useNativeAnchor ? "a" : Link);
  const variantClass = variant ? `btn--${variant}` : "";

  const handleClick = () => {
    if (!trackSection) return;
    import("@vercel/analytics")
      .then(({ track }) => {
        if (typeof track === "function") {
          track("cta_click", { section: trackSection });
        }
      })
      .catch(() => {});
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
