import "./styles/hoursNavigation.scss";

export default function HoursNavigation({
  currentPage,
  totalPages,
  handlePreviousClick,
  handleNextClick,
}) {
  return (
    <div className="component__booking__hours__pagination small">
      <span>
        {currentPage > 1 && (
          <a
            href="#"
            onClick={handlePreviousClick}
            disabled={currentPage === 1}
          >
            Previous
          </a>
        )}
      </span>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <span>
        {currentPage < totalPages && (
          <a
            href="#"
            onClick={handleNextClick}
            disabled={currentPage === totalPages}
          >
            Next
          </a>
        )}
      </span>
    </div>
  );
}
