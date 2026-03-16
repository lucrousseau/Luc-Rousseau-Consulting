const convertOpeningHoursTimeZone = require("./convertOpeningHoursTimeZone").default;

describe("convertOpeningHoursTimeZone", () => {
  it("returns an array of 7 days", () => {
    const result = convertOpeningHoursTimeZone("America/Montreal");
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(7);
  });

  it("each day has day and hours keys", () => {
    const result = convertOpeningHoursTimeZone("America/Montreal");
    const daysOfWeek = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    result.forEach((day, i) => {
      // safe: i is array index, daysOfWeek is fixed
      // eslint-disable-next-line security/detect-object-injection
      expect(day).toHaveProperty("day", daysOfWeek[i]);
      expect(day).toHaveProperty("hours");
      expect(Array.isArray(day.hours)).toBe(true);
    });
  });

  it("returns consistent structure for different timezones", () => {
    const eastern = convertOpeningHoursTimeZone("Canada/Eastern");
    const pacific = convertOpeningHoursTimeZone("America/Los_Angeles");
    expect(eastern).toHaveLength(7);
    expect(pacific).toHaveLength(7);
    eastern.forEach((day) => {
      const sorted = [...day.hours].sort();
      expect(day.hours).toEqual(sorted);
    });
  });
});
