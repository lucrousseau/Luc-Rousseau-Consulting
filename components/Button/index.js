import Link from "next/link";

import classNames from "classnames";

export default function Button({
  className,
  tag,
  variant = "primary",
  size,
  label,
  href,
  type,
  target,
}) {
  const Tag = tag || Link;
  const variantClass = variant ? `btn--${variant}` : "";

  return (
    <Tag
      href={href}
      type={type}
      {...(target ? { target: target } : {})}
      className={classNames("btn", className, variantClass, size)}
    >
      {label}
    </Tag>
  );
}
