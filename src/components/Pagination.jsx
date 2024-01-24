import React from "react";

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

  const paginatoinStyle = { marginLeft: "auto" };
  return (
    <div className="col-10" style={paginatoinStyle}>
      <ul className="pagination justify-content-center">
        {page.map((pageNum, index) => (
          <li
            key={index}
            className={`page-item page-link btn me-1 ${
              pageNum == currentPage ? "active" : ""
            }`}
            aria-current="page"
            onClick={() => setCurrentPage(pageNum)}
          >
            {pageNum}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
