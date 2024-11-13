import React, { useState } from 'react';
import { Button, Collapse } from 'react-bootstrap';
import Table from './Table';
import '../../App.css';

const Database = ({ data, onTableClick, pageSize, page, setPage }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="sidebar-item">
      <Button
        variant="link"
        className="sidebar-link"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
      >
        <span className="menuItems">{data.dbName}</span>
      </Button>
      <Collapse in={expanded}>
        <ul className="sidebar-dropdown list-unstyled ps-2">
          {data.tables.map((table, index) => (
            <Table
              key={index}
              table={table}
              dbName={data.dbName}
              schema={data.schema}
              jndiName={data.jndiName}
              onTableClick={onTableClick}
              pageSize={pageSize}
              page={page}
            />
          ))}
        </ul>
      </Collapse>
    </div>
  );
};

export default Database;
