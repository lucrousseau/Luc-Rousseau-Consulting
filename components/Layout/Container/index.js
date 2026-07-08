import classNames from "classnames";

import { alignments } from "../../../commons/alignments";

import Picture from "../../Picture";

/**
 * @param {object} props
 * @param {import('react').ReactNode} [props.children]
 * @param {string} [props.tag]
 * @param {string} [props.id]
 * @param {string} [props.className]
 * @param {{ src?: string | import('next/image').StaticImageData; width?: number; height?: number; alt?: string }} [props.background]
 * @param {string} [props.backgroundColor]
 * @param {import('react').CSSProperties} [props.style]
 * @param {string} [props.align]
 * @param {string} [props.halign]
 * @param {string} [props.valign]
 */
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
  const Tag = /** @type {import('react').ElementType} */ (tag);
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
