import React, { forwardRef } from 'react';
import { Pagination as BootstrapPagination } from 'react-bootstrap';
import './Pagination.css';

const Pagination = forwardRef(({ currentPage, totalPages, onPageChange }, ref) => {
  const handleSelect = (selectedPage) => {
    if (selectedPage !== currentPage) {
      onPageChange(selectedPage);
    }
  };

  const getPageItems = () => {
    const pageItems = [];
    

    for (let i = 1; i <= Math.min(3, totalPages); i++) {
      pageItems.push(
        <BootstrapPagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => handleSelect(i)}
        >
          {i}
        </BootstrapPagination.Item>
      );
    }

    if (currentPage > 5) {
      pageItems.push(<BootstrapPagination.Ellipsis key="start-ellipsis" disabled />);
    }

    for (let i = Math.max(4, currentPage - 2); i <= Math.min(currentPage + 2, totalPages - 3); i++) {
      pageItems.push(
        <BootstrapPagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => handleSelect(i)}
        >
          {i}
        </BootstrapPagination.Item>
      );
    }

    if (currentPage < totalPages - 4) {
      pageItems.push(<BootstrapPagination.Ellipsis key="end-ellipsis" disabled />);
    }

    for (let i = Math.max(totalPages - 2, 4); i <= totalPages; i++) {
      pageItems.push(
        <BootstrapPagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => handleSelect(i)}
        >
          {i}
        </BootstrapPagination.Item>
      );
    }

    return pageItems;
  };

  return (
    <BootstrapPagination  ref={ref}>
      <BootstrapPagination.Prev
        onClick={() => handleSelect(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
      />
      {getPageItems()}
      <BootstrapPagination.Next
        onClick={() => handleSelect(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
      />
    </BootstrapPagination>
  );
});

export default Pagination;
