import classNames from "classnames";
import type { CSSProperties, ElementType, ReactNode } from "react";
import type { StaticImageData } from "next/image";

import { alignments } from "../../../commons/alignments";

import Picture from "../../Picture";

export interface ContainerBackground {
  src?: string | StaticImageData;
  width?: number;
  height?: number;
  alt?: string;
}

export interface ContainerProps {
  children?: ReactNode;
  tag?: ElementType | string;
  id?: string;
  className?: string;
  background?: ContainerBackground;
  backgroundColor?: string;
  style?: CSSProperties;
  align?: string;
  halign?: string;
  valign?: string;
}

export default function Container({
  children,
  tag = "section",
  id,
  className,
  background,
  backgroundColor,
  style,
  ...props
}: ContainerProps) {
  const Tag = tag as ElementType;
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
              loading="lazy"
              sizes="100vw"
            />
          )}
        </div>
      )}
      {children}
    </Tag>
  );
}
