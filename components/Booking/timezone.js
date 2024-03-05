import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faEarthAmericas } from "@fortawesome/pro-light-svg-icons";

import React, { useState } from "react";
import Fields from "../Fields";
import getsCurrentUserTimezone from "./commons/getsCurrentUserTimezone";

import { TIMEZONE_OPTIONS } from "./commons/constants";

export default function Timezone() {
  const { timezone, utcOffset } = getsCurrentUserTimezone();

  const [currentUserTimezone, setCurrentUserTimezone] = useState(() => {
    if (typeof window !== "undefined") {
      localStorage.getItem("userTimezone") || timezone;
    }

    return timezone;
  });

  const handleTimezoneChange = (event) => {
    const value = event.target.value;
    localStorage.setItem("userTimezone", value);
    setCurrentUserTimezone(value);
  };

  return (
    <Fields
      field="select"
      size="small"
      prefix={<FontAwesomeIcon icon={faEarthAmericas} />}
      value={currentUserTimezone}
      fallbackValue={utcOffset}
      options={TIMEZONE_OPTIONS}
      onChange={handleTimezoneChange}
    />
  );
}
