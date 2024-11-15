import React, {useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import useAxiosFetch from '../../../../Functions/FetchingData/Fetch'
import { Spinner, ProgressBar, Accordion, Button, Table } from 'react-bootstrap';
import Statusbar from './Statusbar';
import Searchbar from '../../../../Functions/Searching/Searchbar'
import Pagination from '../../../../Functions/Pagination/Pagination'
import NoFoundData from '../../../NoFoundData/NoFoundData'

const Mapdb = ({pageSize, page, setPage}) => {
  const { fetchData, loading, error } = useAxiosFetch();
  const location = useLocation();
  const tableData = location.state;
  const [response, setResponse] = useState(null);
  const [uniqueKeys, setUniqueKeys] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Ref a Statusbar állapotának tárolásához
  const statusDataRef = useRef(null);
  const bottomRef = useRef(null);
  const topRef = useRef(null);

  // Progressbar szín meghatározása
  const progressbarColor = (status) => {
    const statusColors = {
      'TBD ': 'secondary',
      'WORK': 'info',
      'ERR ': 'danger',
      'DONE': 'success',
    };
    // Alapértelmezett szín, ha nincs ilyen státusz
    return statusColors[status] || 'primary'; 
  };

  
  //Lekérés a /list útvonalon
  const handleFetch = async () => {
    const dataToSend = {
      jndiName: tableData.jndiName,
      dbName: tableData.dbName,
      tableName: tableData.table,
      dbShema: tableData.schema,
      page: page,
      pageSize: pageSize
    };
  
    try {
      const response = await fetchData({
        //URL localhost vagy websphere
        //url: 'http://localhost:8080/abcMon/api/db/list',
        url: 'http://w3xzea1.mf.corpintra.net/abcMon/api/db/list',
        method: 'POST',
        data: dataToSend,
      });
  
      // Egyedi kulcs tárolása tömben
      const keys = [];
      if (response && response.items) {
        response.items.forEach((item) => {
          Object.keys(item).forEach((key) => {
            if (!keys.includes(key)) {
              keys.push(key);
            }
          });
        });
      }
      //response state beállítása a visszakapott json adattal
      setResponse(response);
      setUniqueKeys(keys);
      // Status data mentése a ref-be
      statusDataRef.current = response.statusCounts;
    } catch (error) {
      console.error("Fetch hiba:", error);
    }
  };
  //Side effect a fetchre. /list ha nem aktív a keresési mód. Frissülés a page és pageSize statekre.
  useEffect(() => {
    if (!isSearching) {
      handleFetch();
    }
  }, [page, pageSize]);

  // Keresési funkció a /search végponthoz
  const handleSearch = async (uniqueKeys, searchInput) => {
    setIsSearching(true);
    setPage(1);
    

    const searchParams = {
      jndiName: tableData.jndiName,
      selectedDropdown: uniqueKeys,
      searchInput: searchInput.toUpperCase().trim(),
      shema: tableData.schema,
      table: tableData.table,
      db: tableData.dbName,
      page: page,
      pageSize: pageSize,
    };

    console.log("Keresési paraméterek:", searchParams);

    try {
      const searchResponse = await fetchData({
        //URL localhost vagy websphere
        //url: 'http://localhost:8080/abcMon/api/db/search',
        url: 'http://w3xzea1.mf.corpintra.net/abcMon/api/db/search',
        method: 'POST',
        data: searchParams,
      });
      console.log("Keresési találatok:",searchResponse);
      
      setResponse(searchResponse);
    } catch (error) {
      console.error("Search hiba:", error);
    } finally {
      setIsSearching(false);
    }
  };

  // Ezzel frissítjük az adatokat
  const handleRefresh = () => {
    handleFetch(); 
  };

  const scrollToBottom = () => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const scrollToTop = () => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div ref={topRef} className="mapdbContainer d-flex flex-column align-items-center py-2 position-relative">
      {loading ? (
        <div className="d-flex justify-content-center mt-3">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : response ? (
        <div className="container d-flex flex-row-reverse">
          {response.totalItems > 0 ? (
            <div className="d-flex flex-column justify-content-between mx-2">
              <div className="text-start">
                <Button style={{backgroundColor: "#e30074", border: "none"}} onClick={scrollToBottom}>Down</Button>
              </div>
              <div className="text-start" style={{marginBottom: "1rem"}}>
                <Button style={{backgroundColor: "#e30074", border: "none"}} onClick={scrollToTop}>Up</Button>
              </div>
            </div>
          ) : null}
          <div className="">
            <div>
              <Statusbar statusData={statusDataRef.current} progressbarColor={progressbarColor} />
              <Searchbar uniqueKeys={uniqueKeys} onSearch={handleSearch} onRefresh={handleRefresh} />
            </div>
          </div>
          <div className="w-100 d-flex flex-column align-items-center">
            {response.totalItems > 0 ? (
              <>
                <Accordion defaultActiveKey="0" style={{width: "80%"}}>
                  {response.items.map((item, index) => (
                    <Accordion.Item eventKey={index.toString()} key={index}>
                      <Accordion.Header>
                        <span className="m-0 bg-light bg-gradient rounded d-inline px-2 py-1">
                          NUMBER: {item.NUMBER}
                        </span>
                        <span
                          className={`ms-2 bg-${progressbarColor(item.RECA_STATUS)}`}
                          style={{
                            borderRadius: '50%',
                            width: '5px',
                            height: '5px',
                            display: 'inline-block',
                          }}
                        ></span>
                        <span
                          className={`ms-2 bg-${progressbarColor(item.CPY1_STATUS)}`}
                          style={{
                            borderRadius: '50%',
                            width: '5px',
                            height: '5px',
                            display: 'inline-block',
                          }}
                        ></span>
                        <span
                          className={`ms-2 bg-${progressbarColor(item.CPY2_STATUS)}`}
                          style={{
                            borderRadius: '50%',
                            width: '5px',
                            height: '5px',
                            display: 'inline-block',
                          }}
                        ></span>
                      </Accordion.Header>
                      <Accordion.Body>
                        <ul className="list-group list-group-flush">
                          {/* RECA szekció */}
                          <li className="list-group-item">
                            <div className="d-flex flex-column">
                              <Table striped borderless hover>
                                <thead>
                                  <tr>
                                    <th>Recall Status</th>
                                    <th>Number:</th>
                                    <th>Recall Time:</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>{item.RECA_STATUS}</td>
                                    <td>{item.NUMBER}</td>
                                    <td>{item.RECA_TIME}</td>
                                  </tr>
                                </tbody>
                              </Table>
                              <ProgressBar
                                now={100}
                                variant={progressbarColor(item.RECA_STATUS)}
                                label={item.RECA_STATUS}
                              />
                            </div>
                          </li>
                          {/* Copy 1 szekció */}
                          <li className="list-group-item">
                            <div className="d-flex flex-column">
                              <Table striped borderless hover>
                                <thead>
                                  <tr>
                                    <th>Copy 1 Status</th>
                                    <th>Copy 1 Net</th>
                                    <th>Copy 1 Time:</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>{item.CPY1_STATUS}</td>
                                    <td>{item.CPY1_NET}</td>
                                    <td>{item.CPY1_TIME}</td>
                                  </tr>
                                </tbody>
                              </Table>
                              <ProgressBar
                                now={100}
                                variant={progressbarColor(item.CPY1_STATUS)}
                                label={item.CPY1_STATUS}
                              />
                            </div>
                          </li>
                          {/* Copy 2 szekció */}
                          <li className="list-group-item">
                            <div className="d-flex flex-column">
                              <Table striped borderless hover>
                                <thead>
                                  <tr>
                                    <th>Copy 2 Status</th>
                                    <th>Copy 2 Net</th>
                                    <th>Copy 2 Time</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>{item.CPY2_STATUS}</td>
                                    <td>{item.CPY2_NET}</td>
                                    <td>{item.CPY2_TIME}</td>
                                  </tr>
                                </tbody>
                              </Table>
                              <ProgressBar
                                now={100}
                                variant={progressbarColor(item.CPY2_STATUS)}
                                label={item.CPY2_STATUS}
                              />
                            </div>
                          </li>
                        </ul>
                      </Accordion.Body>
                    </Accordion.Item>
                  ))}
                </Accordion>
                <Pagination
                  ref={bottomRef}
                  currentPage={page}
                  totalPages={Math.ceil(response.totalItems / tableData.pageSize)}
                  onPageChange={setPage}
                />
              </>
            ) : (
              <NoFoundData />
            )}
          </div>
        </div>
      ) : null}
      {error && <p>Hiba történt: {error.message}</p>}
    </div>
  );
  

};

export default Mapdb;
