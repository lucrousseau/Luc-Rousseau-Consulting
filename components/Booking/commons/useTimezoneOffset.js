import { useState, useEffect } from "react";
import moment from "moment-timezone";

import { TIMEZONE } from "./constants";

export default function UseTimezoneOffset() {
  const [timezoneOffset, setTimezoneOffset] = useState(0);

  useEffect(() => {
    const calculateTimezoneOffset = () => {
      const now = moment();
      const localOffset = now.utcOffset();
      const targetOffset = moment.tz(TIMEZONE).utcOffset();
      const offset = (targetOffset - localOffset) / 60;
      return offset;
    };

    setTimezoneOffset(calculateTimezoneOffset());
  }, []);

  return timezoneOffset;
}
