import React, {useEffect} from 'react';
import Sidebar from './Sidebar';
import { Navbar, Container, Offcanvas, Button, Nav } from 'react-bootstrap';
import Mapdb from '../TableData/DB/Mapdb/Mapdb';
import Mapdb2 from '../TableData/DB/Mapdb2/Mapdb2';
import Home from '../MenuPages/Home';
import { Routes, Route, useNavigate } from 'react-router-dom';
import '../../App.css';

const MenuComponent = ({ menu, handleSidebarToggle, showSidebar, setLastClickedTable, setShowSidebar, pageSize, page, setPage }) => {
  const navigate = useNavigate();

  //dinamikus navigálás beállítása
  const handleTableClick = (tableData) => {
    setLastClickedTable(tableData);
    navigate(`/abcMon/table/${tableData.table}`, { state: tableData });
    setShowSidebar(false);
  };

  //navigálás a főoldalra
  const handleHomeClick = () => {
    navigate('/abcMon');
    setShowSidebar(false);
  };

  // useEffect, hogy a menü bezáródjon navigálás után
  useEffect(() => {
    setShowSidebar(false);
  }, [navigate, setShowSidebar]);

  return (
    <div style={{ height: "100%" }}>
      <Navbar expand={false}>
        <Container fluid>
          <Button variant="outline-light" onClick={handleSidebarToggle}>
            ☰
          </Button>
          <Nav.Link className="text-light" onClick={handleHomeClick}>Home</Nav.Link>
          <Navbar.Brand className="text-light" bg="light" onClick={handleHomeClick}>ABCMon</Navbar.Brand>
        </Container>
      </Navbar>

      <Offcanvas className="custom-sidebar" show={showSidebar} onHide={handleSidebarToggle} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>ABCMon</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Sidebar menu={menu} onTableClick={handleTableClick} pageSize={pageSize} />
        </Offcanvas.Body>
      </Offcanvas>

      <Routes>
        <Route path="/abcMon" element={<Home />} />
        <Route path="/abcMon/table/Z00RCPY1" element={<Mapdb pageSize={pageSize} page={page} setPage={setPage} />} />
        <Route path="/abcMon/table/Z00RCPY2" element={<Mapdb2 pageSize={pageSize} page={page} setPage={setPage} />} />
      </Routes>
    </div>
  );
};

export default MenuComponent;
