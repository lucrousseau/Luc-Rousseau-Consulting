import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faAngleDown } from "@fortawesome/pro-light-svg-icons";

export default function Select({
  name,
  options,
  value,
  prefix,
  defaultValue,
  fallbackValue,
  onChange,
  required,
  placeholder,
}) {
  const renderOptions = (options) => {
    return options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ));
  };

  return (
    <>
      {prefix && <span className="component__fields__prefix">{prefix}</span>}
      <select
        name={name}
        value={value || fallbackValue}
        defaultValue={defaultValue}
        {...(required && { required: true })}
        onChange={onChange}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {Array.isArray(options)
          ? renderOptions(options)
          : Object.entries(options).map(([groupLabel, groupOptions]) => (
              <optgroup label={groupLabel} key={groupLabel}>
                {renderOptions(groupOptions)}
              </optgroup>
            ))}
      </select>
      <FontAwesomeIcon icon={faAngleDown} />
    </>
  );
}
