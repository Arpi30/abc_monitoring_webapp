import React, { useState } from 'react';
import { Button, Collapse } from 'react-bootstrap';
import Database from './Database';
import '../../App.css';

const Subsystem = ({ data, onTableClick, pageSize, page, setPage }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="sidebar-item">
      <Button
        variant="link"
        className="sidebar-link"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
      >
        <span className="menuItems">{data.name}</span>
      </Button>
      <Collapse in={expanded}>
        <ul className="sidebar-dropdown list-unstyled ps-2">
          {data.databases.map((database, index) => (
            <Database key={index} data={database} onTableClick={onTableClick} pageSize={pageSize} page={page}/>
          ))}
        </ul>
      </Collapse>
    </div>
  );
};

export default Subsystem;
