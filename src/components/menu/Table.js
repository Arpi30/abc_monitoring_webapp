import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';

const Table = ({ table, dbName, schema, jndiName, pageSize, page }) => {
  //Az átadott propokat küldjuk a backendnek feldolgozásra
  return (
    <li className="sidebar-item">
      <Link
        to={`/abcMon/table/${table}`} 
        state={{ dbName, table, schema, jndiName, page, pageSize }}
        className="sidebar-link clickable menuItems ps-3"
      >
        {table}
      </Link>
    </li>
  );
};

export default Table;
