import Link from "next/link";

import classNames from "classnames";

function isExternalHref(href) {
  if (!href || typeof href !== "string") return false;
  return /^(https?:|mailto:|tel:)/i.test(href);
}

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
}) {
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
