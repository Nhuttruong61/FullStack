import React from "react";
import ReactPaginate from "react-paginate";
import "./style.scss";

function PanigateCpn({ itemsPerPage, pageSize, setPage }) {
  let item = [];

  for (let i = 0; i < pageSize; i++) {
    item.push(i);
  }
  const pageCount = Math.ceil(item.length / itemsPerPage);
  const handlePageClick = (event) => {
    const newOffset = event.selected + 1;
    setPage(newOffset);
  };

  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
        containerClassName="pagination-container"
        pageClassName="pagination-item"
        pageLinkClassName=""
        previousClassName="pagination-item"
        previousLinkClassName=""
        nextClassName="pagination-item"
        nextLinkClassName=""
        breakClassName="pagination-item"
        breakLinkClassName=""
        activeClassName="activepn"
        for
        active
        item
      />
    </>
  );
}

export default PanigateCpn;
