import Link from "next/link";

import classNames from "classnames";
import { track } from "@vercel/analytics";

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
  const Tag = tag || Link;
  const variantClass = variant ? `btn--${variant}` : "";

  const handleClick = () => {
    if (trackSection && typeof track === "function") {
      track("cta_click", { section: trackSection });
    }
  };

  return (
    <Tag
      href={href}
      type={type}
      {...(target ? { target: target } : {})}
      {...(trackSection ? { onClick: handleClick } : {})}
      className={classNames("btn", className, variantClass, size)}
    >
      {label}
    </Tag>
  );
}
