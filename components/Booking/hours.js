import React, { useState, useEffect } from "react";

import moment from "moment-timezone";
import convertOpeningHoursTimeZone from "./commons/convertOpeningHoursTimeZone";
import HoursNavigation from "./hoursNavigation";
import getsCurrentUserTimezone from "./commons/getsCurrentUserTimezone";

import { TIMEZONE } from "./commons/constants";

import "./styles/hours.scss";

export default function Hours({ day, month, year }) {
  const date = moment.tz(`${year}-${month}-${day}`, "YYYY-MM-DD", TIMEZONE);
  const dayOfWeek = date.format("dddd");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    setCurrentPage(1);
  }, [day, month, year]);

  const convertedHours = convertOpeningHoursTimeZone(
    getsCurrentUserTimezone().timezone
  );
  const hoursForDay = convertedHours.find((d) => d.day === dayOfWeek);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems =
    hoursForDay && hoursForDay.hours.length > 0
      ? hoursForDay.hours.slice(indexOfFirstItem, indexOfLastItem)
      : [];

  const totalPages = hoursForDay
    ? Math.ceil(hoursForDay.hours.length / itemsPerPage)
    : 0;

  // Handlers to change page
  const handlePreviousClick = (event) => {
    event.preventDefault();
    setCurrentPage(currentPage - 1);
  };

  const handleNextClick = (event) => {
    event.preventDefault();
    setCurrentPage(currentPage + 1);
  };

  return (
    <>
      <h3>{date.format("dddd, MMMM D")}</h3>
      <div className="component__booking__hours__list">
        {currentItems.map((hour, index) => (
          <span key={index}>{moment(hour, "HH:mm").format("h:mm A")}</span>
        ))}
        {currentItems.length === 0 && <span>Closed</span>}
      </div>
      {hoursForDay && hoursForDay.hours.length > itemsPerPage && (
        <HoursNavigation
          currentPage={currentPage}
          totalPages={totalPages}
          handlePreviousClick={handlePreviousClick}
          handleNextClick={handleNextClick}
        />
      )}
    </>
  );
}
