import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import convertOpeningHoursTimeZone from "./commons/convertOpeningHoursTimeZone";
import HoursNavigation from "./hoursNavigation";

export default function Hours({ day, month, year, timezone, convertedHours }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentItems, setCurrentItems] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    setCurrentPage(1);
    const date = moment.tz(`${year}-${month}-${day}`, "YYYY-MM-DD", timezone);
    const dayOfWeek = date.format("dddd");
    const convertedHours = convertOpeningHoursTimeZone(timezone);
    const hoursForDay = convertedHours.find((d) => d.day === dayOfWeek);

    if (hoursForDay && hoursForDay.hours.length > 0) {
      const itemsPerPage = 12;
      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      setCurrentItems(hoursForDay.hours.slice(indexOfFirstItem, indexOfLastItem));
      setTotalPages(Math.ceil(hoursForDay.hours.length / itemsPerPage));
    } else {
      setCurrentItems([]);
      setTotalPages(0);
    }
  }, [day, month, year, timezone, currentPage, convertedHours]);

  const handlePreviousClick = (event) => {
    event.preventDefault();
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextClick = (event) => {
    event.preventDefault();
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      <h3>{moment.tz(`${year}-${month}-${day}`, "YYYY-MM-DD", timezone).format("dddd, MMMM D")}</h3>
      <div className="component__booking__hours__list">
        {currentItems.map((hour, index) => (
          <span key={index}>{moment.tz(hour, "HH:mm", timezone).format("h:mm A")}</span>
        ))}
        {currentItems.length === 0 && <span>Closed</span>}
      </div>
      {totalPages > 1 && (
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
