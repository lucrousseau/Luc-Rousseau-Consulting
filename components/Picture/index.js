import classNames from "classnames";

import Image from "next/image";

import { alignments } from "../../commons/alignments";

import "./style.scss";

export default function Picture({
  className,
  src,
  alt,
  width = 500,
  height = 500,
  layout,
  priority,
  absolute,
  rounded,
  ...props
}) {
  const alignmentsClass = alignments({ props });

  return (
    <div
      tag={"picture"}
      className={classNames(
        "component component__picture",
        className,
        alignmentsClass,
        {
          "component__picture--absolute": absolute,
          "component__picture--rounded": rounded,
        }
      )}
    >
      <Image
        src={src}
        width={width}
        height={height}
        alt={alt}
        layout={layout}
        priority={priority}
      />
    </div>
  );
}
