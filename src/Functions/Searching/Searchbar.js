import React, { useState } from 'react';
import { Dropdown, Form, Button, InputGroup } from 'react-bootstrap';

const Searchbar = ({ uniqueKeys, onSearch, onRefresh  }) => {
  const [selectedKey, setSelectedKey] = useState('');
  const [searchInput, setSearchInput] = useState('');

  //Kiválasztott kulcs a keresési menűből
  const handleSelectChange = (key) => {
    setSelectedKey(key);
  };

  //Input mező értékének a kinyerése
  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  //Keresés indítása
  const handleSearchClick = () => {
    console.log("Keresés indítása:", selectedKey, searchInput);
    if (onSearch) {
      onSearch(selectedKey, searchInput);
    }
  };

  //A komponens újrabetöltése
  const handleRefreshClick = () => {
    if (onRefresh) {
      onRefresh(); 
    }
  };

  return (
    <div className="dropdown-container position-fixed p-2" style={{width: '18rem', border: "3px solid #e30074", right: "25px", top: "40%", borderRadius: "0.375rem"}}>
      <div className="d-flex flex-row justify-content-between">
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
        <Button onClick={handleRefreshClick} style={{backgroundColor: "#e30074", border: "none"}}>Reload</Button>
      </div>
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
