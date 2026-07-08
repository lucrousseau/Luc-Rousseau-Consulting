import Link from "next/link";

import classNames from "classnames";

/**
 * @param {unknown} href
 * @returns {boolean}
 */
function isExternalHref(href) {
  if (!href || typeof href !== "string") return false;
  return /^(https?:|mailto:|tel:)/i.test(href);
}

/**
 * @param {object} props
 * @param {string} [props.className]
 * @param {import('react').ElementType} [props.tag]
 * @param {string} [props.variant]
 * @param {string | null} [props.size]
 * @param {import('react').ReactNode} [props.label]
 * @param {string} [props.href]
 * @param {string} [props.type]
 * @param {string} [props.target]
 * @param {string} [props.trackSection]
 */
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
  const Tag = /** @type {import('react').ElementType} */ (tag || (useNativeAnchor ? "a" : Link));
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
