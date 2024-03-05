import classNames from "classnames";

import "./style.scss";

export default function Button({
  className,
  tag = "a",
  variant = "primary",
  size,
  label,
  href,
  type,
}) {
  const Tag = tag;
  const variantClass = variant ? `btn--${variant}` : "";

  return (
    <Tag
      href={href}
      type={type}
      className={classNames("btn", className, variantClass, size)}
    >
      {label}
    </Tag>
  );
}
