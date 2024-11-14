import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import MenuComponent from './components/menu/MenuComponent';
import './App.css';

const App = () => {
  const [lastClickedTable, setLastClickedTable] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);          //sideBar state
  const [page, setPage] = useState(1)                             //page State

  const handleSidebarToggle = () => setShowSidebar(!showSidebar);

  //Menu objektum
  const menu = [
    {
      lpar: "SY27",
      subsystems: [
        {
          name: "DSE4",
          databases: [
            {
              schema: "D$PZ00",
              dbName: "MAPDB",
              jndiName: "jdbc/sy27conn.db",
              tables: ["Z00RCPY1"]
            },
            {
              schema: "D$PZ01",
              dbName: "MAPDB2",
              jndiName: "jdbc/sy27conn.db",
              tables: ["Z00RCPY2"]
            }
          ]
        }
      ]
    }
  ];
  

  return (

      <BrowserRouter>
        <div className="App">
          <MenuComponent
            menu={menu}
            handleSidebarToggle={handleSidebarToggle}
            showSidebar={showSidebar}
            setLastClickedTable={setLastClickedTable}
            setShowSidebar={setShowSidebar}
            pageSize={40}
            page={page}
            setPage={setPage}
            />
        </div>
      </BrowserRouter>

  );
};

export default App;
