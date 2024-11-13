import React, { createContext, useState, useContext } from 'react';

const PaginationContext = createContext();

export const usePagination = () => {
    return useContext(PaginationContext);
};

export const PaginationProvider = ({ children }) => {
    // A táblák oldalszámai
    const [pagination, setPagination] = useState({}); 

    const setPage = (tableName, page) => {
    // A táblanév és az oldal frissítése
    setPagination((prevPagination) => ({
        ...prevPagination,
        [tableName]: page, 
    }));
    };

    

    return (
    <PaginationContext.Provider value={{ pagination, setPage }}>
        {children}
    </PaginationContext.Provider>
    );
};


export { PaginationContext };
