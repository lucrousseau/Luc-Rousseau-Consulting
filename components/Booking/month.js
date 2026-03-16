import React, { useState } from "react";
import className from "classnames";
import moment from "moment";

import { DAYS_OF_WEEK } from "./commons/constants";

export default function Month({ month, year, onSelectDay, convertedHours }) {
  const [selectedDay, setSelectedDay] = useState(null);

  const monthStart = moment(`${year}-${month + 1}`, "YYYY-MM").startOf("month");
  const monthEnd = monthStart.clone().endOf("month");
  const currentMoment = moment();

  const isBeforeToday = (day) => {
    const dayToCompare = moment(`${year}-${month + 1}-${day}`, "YYYY-MM-DD").startOf("day");

    return dayToCompare.isBefore(currentMoment.startOf("day"));
  };

  const isToday = (day) => {
    return (
      currentMoment.format("YYYY-MM-DD") ===
      moment(`${year}-${month + 1}-${day}`, "YYYY-MM-DD").format("YYYY-MM-DD")
    );
  };

  const isAvailable = (day) => {
    const weekdayIndex = moment(`${year}-${month + 1}-${day}`, "YYYY-MM-DD").isoWeekday() - 1;
    // safe: weekdayIndex is 0-6 from isoWeekday()
    // eslint-disable-next-line security/detect-object-injection
    const availability = convertedHours[weekdayIndex];

    if (!availability) {
      return false;
    }

    const currentTime = moment().format("HH:mm");
    return availability.hours.some((hour) => currentTime >= hour);
  };

  // Adjusted to use moment.js
  const firstDayOfMonth = monthStart.day();
  const daysInMonth = monthEnd.date();

  // Generate days of the month using moment.js
  const days = Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1;
    const dateStr = moment(`${year}-${month + 1}-${day}`, "YYYY-MM-DD").format("YYYY-MM-DD");

    const isInactive = isBeforeToday(day) || !isAvailable(day);

    return (
      <td
        key={day}
        className={className({
          isToday: isToday(day),
          isSelected: selectedDay === dateStr,
          isInactive: isInactive,
        })}
        onClick={() => {
          if (!isBeforeToday(day) && !isInactive) {
            setSelectedDay(dateStr);
            onSelectDay(dateStr);
          }
        }}
      >
        <span>{day}</span>
      </td>
    );
  });

  const emptyDays = Array.from({ length: firstDayOfMonth }).map((_, i) => (
    <td key={`empty-${i}`} className="isInactive">
      <span></span>
    </td>
  ));

  // Combine and organize into weeks
  const totalSlots = [...emptyDays, ...days];
  let rows = [];
  for (let i = 0; i < totalSlots.length; i += 7) {
    rows.push(totalSlots.slice(i, i + 7));
  }

  return (
    <table>
      <thead>
        <tr>
          {DAYS_OF_WEEK.map((day, index) => (
            <th key={index}>
              <span>{day}</span>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={index}>{row}</tr>
        ))}
      </tbody>
    </table>
  );
}
