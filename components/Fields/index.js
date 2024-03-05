import classNames from "classnames";

import { alignments } from "../../commons/alignments";

import Label from "./label";
import Input from "./input";
import Select from "./select";

import "./style.scss";

export default function Fields({
  field = "input",
  required,
  label,
  prefix,
  type,
  value,
  defaultValue,
  fallbackValue,
  options,
  size,
  onChange,
  ...props
}) {
  const alignmentsClass = alignments({ props });

  return (
    <div
      className={classNames(
        "component component__fields",
        {
          [size]: size,
          "component__fields--prefix": prefix,
        },
        alignmentsClass
      )}
      field-type={field}
    >
      <label>
        {label && <Label required={required} label={label} />}
        {field === "input" && (
          <Input
            prefix={prefix}
            type={type}
            value={value}
            defaultValue={defaultValue}
            {...props}
          />
        )}
        {field === "select" && (
          <Select
            prefix={prefix}
            options={options}
            value={value}
            defaultValue={defaultValue}
            fallbackValue={fallbackValue}
            placeholder={"Select yout Timezone"}
            onChange={onChange}
            {...props}
          />
        )}
      </label>
    </div>
  );
}
