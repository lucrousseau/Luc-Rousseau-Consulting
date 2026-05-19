import classNames from "classnames";

import Image from "next/image";

import { alignments } from "../../commons/alignments";

export default function Picture({
  className,
  src,
  alt,
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
      tag={"picture"}
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
        loading={priority ? undefined : loading}
        sizes={sizes}
        quality={priority ? 85 : 75}
      />
    </div>
  );
}
