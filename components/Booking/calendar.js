import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import Row from "../Layout/Row";
import CalendarNavigation from "./calendarNavigation";
import Month from "./month";
import Timezone from "./timezone";
import Hours from "./hours";
import getsCurrentUserTimezone from "./commons/getsCurrentUserTimezone";
import convertOpeningHoursTimeZone from "./commons/convertOpeningHoursTimeZone";

import { TIMEZONE } from "./commons/constants";

import "./styles/calendar.scss";

export default function Calendar({ month, year }) {
  const { timezone } = getsCurrentUserTimezone();

  const [currentUserTimezone, setCurrentUserTimezone] = useState(timezone);
  const [convertedHours, setConvertedHours] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTimezone = localStorage.getItem("userTimezone");
      if (storedTimezone) {
        setCurrentUserTimezone(storedTimezone);
      }
    }

    const hours = convertOpeningHoursTimeZone(currentUserTimezone);
    setConvertedHours(hours);
  }, [currentUserTimezone]);

  const initialDate =
    month && year
      ? moment.tz(`${year}-${month}-01`, "YYYY-MM-DD", TIMEZONE)
      : moment.tz(TIMEZONE);

  const [currentDate, setCurrentDate] = useState(initialDate);
  const [selectedDate, setSelectedDate] = useState(initialDate);

  useEffect(() => {
    if (month && year) {
      const newDate = moment.tz(`${year}-${month}-01`, "YYYY-MM-DD", TIMEZONE);
      setCurrentDate(newDate);
    }
  }, [month, year]);

  const handlePreviousClick = () => {
    setCurrentDate((prevDate) => prevDate.clone().subtract(1, "month"));
  };

  const handleNextClick = () => {
    setCurrentDate((prevDate) => prevDate.clone().add(1, "month"));
  };

  const handleSelectDay = (day) => {
    const newDate = moment.tz(
      `${year}-${month}-${day}`,
      "YYYY-MM-DD",
      TIMEZONE
    );
    setSelectedDate(newDate);
  };

  const currentMonth = currentDate.format("MM");
  const currentYear = currentDate.format("YYYY");
  const currentMonthYear = currentDate.format("MMMM YYYY");

  const currentSelectedDay = selectedDate.format("DD");
  const currentSelectedMonth = selectedDate.format("MM");
  const currentSelectedYear = selectedDate.format("YYYY");

  return (
    <Row
      columns={[
        {
          className: "component__booking__calendar",
          cols: { sm: 12 },
          content: (
            <>
              <h3>Select a Data & Time</h3>
              <CalendarNavigation
                onPreviousClick={handlePreviousClick}
                onNextClick={handleNextClick}
                currentMonthYear={currentMonthYear}
              />
              <Month
                month={currentMonth}
                year={currentYear}
                onSelectDay={handleSelectDay}
                convertedHours={convertedHours}
              />
              <Timezone
                currentUserTimezone={currentUserTimezone}
                setCurrentUserTimezone={setCurrentUserTimezone}
              />
            </>
          ),
        },
        {
          className: "component__booking__hours",
          cols: { sm: 12 },
          content: (
            <Hours
              day={currentSelectedDay}
              month={currentSelectedMonth}
              year={currentSelectedYear}
              timezone={currentUserTimezone}
              convertedHours={convertedHours}
            />
          ),
        },
      ]}
    />
  );
}
