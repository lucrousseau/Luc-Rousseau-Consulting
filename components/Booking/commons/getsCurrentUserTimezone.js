import moment from "moment-timezone";

export default function getsCurrentUserTimezone() {
  const guessedTimezone = moment.tz.guess();
  const offset = moment.tz(guessedTimezone).utcOffset();
  const hours = Math.floor(Math.abs(offset) / 60);
  const minutes = Math.abs(offset) % 60;
  const utcOffset = `UTC${offset >= 0 ? "+" : "-"}${hours}${
    minutes > 0 ? "." + (minutes / 60).toString().split(".")[1] : ""
  }`;

  return {
    timezone: guessedTimezone,
    utcOffset,
  };
}
