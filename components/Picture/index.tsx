import classNames from "classnames";

import Image, { type StaticImageData } from "next/image";

import { alignments, type AlignmentProps } from "../../commons/alignments";

type PictureProps = AlignmentProps & {
  className?: string;
  src: string | StaticImageData;
  alt?: string;
  width?: number;
  height?: number;
  layout?: string;
  priority?: boolean;
  loading?: "lazy" | "eager";
  absolute?: boolean;
  rounded?: boolean;
  sizes?: string;
};

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
}: PictureProps) {
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
