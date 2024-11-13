import React from 'react';
import { Button } from 'react-bootstrap';
import '../../App.css';

const Table = ({ table, dbName, schema, jndiName, onTableClick, pageSize, page }) => {

  console.log(table, dbName, schema, jndiName, onTableClick, pageSize, page);
  

  return (
    <li className="sidebar-item">
      <Button
        variant="link"
        className="sidebar-link clickable menuItems"
        onClick={() => onTableClick({ dbName, table, schema, jndiName, page, pageSize } )}
      >
        {table}
      </Button>
    </li>
  );
};

export default Table;
