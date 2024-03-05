import moment from "moment-timezone";

import { OPENING_HOURS, TIMEZONE } from "./constants";

export default function convertOpeningHoursTimeZone(toTimeZone) {
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  let adjustedOpeningHours = OPENING_HOURS.map((day) => ({
    ...day,
    hours: [],
  }));

  OPENING_HOURS.forEach((day, index) => {
    day.hours.forEach((time) => {
      const dateTime = moment.tz(`${day.day} ${time}`, "dddd HH:mm", TIMEZONE);
      const convertedTime = dateTime.tz(toTimeZone).format("HH:mm");
      const convertedDayOfWeek = dateTime.tz(toTimeZone).format("dddd");

      const dayIndex = daysOfWeek.indexOf(convertedDayOfWeek);
      if (dayIndex !== -1) {
        adjustedOpeningHours[dayIndex].hours.push(convertedTime);
      }
    });
  });

  adjustedOpeningHours.forEach((day) => day.hours.sort());

  return adjustedOpeningHours;
}
