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
  style,
  ...props
}) {
  const Tag = tag;
  const alignmentsClass = alignments({ prefix: "container", props });

  const tagProps = {
    className: classNames("container", className, alignmentsClass),
    style: style,
    ...(id && { id }),
  };

  return (
    <Tag {...tagProps}>
      {background && (
        <div className="container__background">
          {background.src && (
            <Picture
              src={background.src}
              alt={"Placeholder Image"}
              absolute={true}
            />
          )}
        </div>
      )}
      {children}
    </Tag>
  );
}
