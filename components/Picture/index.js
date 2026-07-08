import classNames from "classnames";

import Image from "next/image";

import { alignments } from "../../commons/alignments";

/**
 * @param {object} props
 * @param {string} [props.className]
 * @param {string | import('next/image').StaticImageData} props.src
 * @param {string} [props.alt]
 * @param {number} [props.width]
 * @param {number} [props.height]
 * @param {string} [props.layout]
 * @param {boolean} [props.priority]
 * @param {"lazy" | "eager"} [props.loading]
 * @param {boolean} [props.absolute]
 * @param {boolean} [props.rounded]
 * @param {string} [props.sizes]
 * @param {string} [props.align]
 * @param {string} [props.halign]
 * @param {string} [props.valign]
 */
export default function Picture({
  className,
  src,
  alt = "",
  width = 500,
  height = 500,
  layout,
  priority,
  loading,
  absolute,
  rounded,
  sizes,
  ...props
}) {
  const alignmentsClass = alignments({ props });

  return (
    <div
      className={classNames("component component__picture", className, alignmentsClass, {
        "component__picture--absolute": absolute,
        "component__picture--rounded": rounded,
      })}
    >
      <Image
        src={src}
        width={width}
        height={height}
        alt={alt}
        layout={layout}
        priority={Boolean(priority)}
        fetchPriority={priority ? "high" : undefined}
        loading={priority ? "eager" : (loading ?? "lazy")}
        sizes={sizes}
        quality={priority ? 85 : 75}
      />
    </div>
  );
}
