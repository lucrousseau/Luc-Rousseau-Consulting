import classNames from "classnames";

import { alignments } from "../../commons/alignments";

import "./style.scss";

export default function Picture({
  className,
  src,
  alt,
  loading = "lazy",
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
      <img src={src} alt={alt} loading={loading} />
    </div>
  );
}
