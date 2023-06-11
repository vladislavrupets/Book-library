import { KeyboardArrowRight, KeyboardArrowLeft } from "@mui/icons-material";

import "./pagination.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="pagination">
      <button
        className="main-button visible"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <KeyboardArrowLeft />
        <span>Prev</span>
      </button>
      <span className="pagination__page">Page {currentPage}</span>
      <button
        className="main-button visible"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <span>Next</span>
        <KeyboardArrowRight />
      </button>
    </div>
  );
};

export default Pagination;
