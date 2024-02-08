import React from "react";
import "../style/Pagination.css";

const Pagination = ({
  totalPosts,
  postPerPage,
  setCurrentPage,
  currentPage,
}) => {
  let page = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    page.push(i);
  }

  let paginationBtn = {
    padding: "5px 15px",
    borderRadius: "20px",
    fontSize: "16px",
    color: "#40a2d8",
    border: "1px solid #40a2d8",
  };

  return (
    <>
      <ul className="pagination justify-content-center">
        {page.map((pageNum, index) => (
          <li
            key={index}
            className={`page-item pagination-btn btn me-2 ${
              pageNum == currentPage ? "active" : ""
            }`}
            aria-current="page"
            onClick={() => setCurrentPage(pageNum)}
          >
            {pageNum}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Pagination;
