import React, { useState } from 'react';
import { Button, Collapse } from 'react-bootstrap';
import Subsystem from './Subsystem';
import '../../App.css';

const LPAR = ({ data, onTableClick, pageSize, page }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="sidebar-item">
      <Button
        variant="link"
        className="sidebar-link"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
      >
        <i className="lni lni-database"></i>
        <span className="menuItems">{data.lpar}</span>
      </Button>
      <Collapse in={expanded}>
        <ul className="sidebar-dropdown list-unstyled ps-2">
          {data.subsystems.map((subsystem, index) => (
            <Subsystem key={index} data={subsystem} onTableClick={onTableClick} pageSize={pageSize} page={page}/>
          ))}
        </ul>
      </Collapse>
    </div>
  );
};

export default LPAR;
