import React, { useState } from 'react';
import { Dropdown, Form, Button, InputGroup } from 'react-bootstrap';

const Searchbar = ({ uniqueKeys, onSearch }) => {
  const [selectedKey, setSelectedKey] = useState('');
  const [searchInput, setSearchInput] = useState('');

  const handleSelectChange = (key) => {
    setSelectedKey(key);
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearchClick = () => {
    console.log("Keresés indítása:", selectedKey, searchInput);
    if (onSearch) {
      onSearch(selectedKey, searchInput);
    }
  };

  return (
    <div className="dropdown-container position-fixed p-2" style={{width: '18rem', border: "3px solid #e30074", right: "25px", top: "40%", borderRadius: "0.375rem"}}>
      <Dropdown className="text-start" onSelect={handleSelectChange}>
        <Dropdown.Toggle style={{backgroundColor: "#e30074", border: "none"}} id="dropdown-basic">
          {selectedKey || 'Select an item'}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {uniqueKeys.map((key) => (
            <Dropdown.Item key={key} eventKey={key}>
              {key}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      <InputGroup className="mt-2">
        <Form.Control
          type="text"
          placeholder="Searching..."
          value={searchInput}
          onChange={handleSearchInputChange}
        />
        <Button style={{backgroundColor: "#e30074", border: "none"}} onClick={handleSearchClick}>
          Search
        </Button>
      </InputGroup>
    </div>
  );
};

export default Searchbar;
