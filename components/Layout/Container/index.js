import classNames from "classnames";

import { alignments } from "../../../commons/alignments";

import Picture from "../../Picture";

import "./style.scss";

export default function Container({
  children,
  tag = "section",
  id,
  className,
  background,
  backgroundColor,
  style,
  ...props
}) {
  const Tag = tag;
  const alignmentsClass = alignments({ prefix: "container", props });
  const tagProps = {
    className: classNames("container", className, alignmentsClass),
    style,
    ...(id && { id }),
  };

  return (
    <Tag {...tagProps}>
      {(background || backgroundColor) && (
        <div className="container__background" style={{ backgroundColor }}>
          {background && background.src && (
            <Picture
              src={background.src}
              width={background.width}
              height={background.height}
              alt={background.alt}
              absolute={true}
            />
          )}
        </div>
      )}
      {children}
    </Tag>
  );
}
