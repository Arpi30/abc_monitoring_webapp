// Pagination.js
import React from 'react';
import { Pagination as BootstrapPagination } from 'react-bootstrap';
import './Pagination.css'; //

const Pagination = ({ currentPage, totalPages, onPageChange }) => {

  const handleSelect = (selectedPage) => {
    onPageChange(selectedPage);
  };

  const getPageItems = () => {
    const pageItems = [];

    // Az első 3 oldal mindig látható
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

    // Ha szükséges, hozzáadunk "..." jelölést az első 3 oldal és a középső rész között
    if (currentPage > 5) {
      pageItems.push(<BootstrapPagination.Ellipsis key="start-ellipsis" disabled />);
    }

    // Középső rész: az aktuális oldal és a környező oldalak
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

    // Ha szükséges, hozzáadunk "..." jelölést a középső rész és az utolsó 3 oldal között
    if (currentPage < totalPages - 4) {
      pageItems.push(<BootstrapPagination.Ellipsis key="end-ellipsis" disabled />);
    }

    // Az utolsó 3 oldal mindig látható
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
    <BootstrapPagination>
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
};

export default Pagination;
