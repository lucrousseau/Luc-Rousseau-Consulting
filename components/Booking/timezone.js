import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEarthAmericas } from "@fortawesome/pro-light-svg-icons";
import Fields from "../Fields";

import { TIMEZONE_OPTIONS } from "./commons/constants";

export default function Timezone({
  currentUserTimezone,
  setCurrentUserTimezone,
}) {
  const handleTimezoneChange = (event) => {
    const value = event.target.value;
    if (typeof window !== "undefined") {
      localStorage.setItem("userTimezone", value);
    }
    setCurrentUserTimezone(value);
  };

  return (
    <Fields
      field="select"
      size="small"
      prefix={<FontAwesomeIcon icon={faEarthAmericas} />}
      value={currentUserTimezone}
      options={TIMEZONE_OPTIONS}
      onChange={handleTimezoneChange}
    />
  );
}
