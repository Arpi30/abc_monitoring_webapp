import React, { useState } from 'react';
import axios from 'axios';

const useAxiosFetch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async ({ url, method = 'GET', data = {} }) => {
    setLoading(true);
    setError(null);

    if (!url) {
      console.error("Nincs URL megadva a fetchData függvényhez.");
      throw new Error("fetchData: Az URL hiányzik!");
    }

    try {
      const response = await axios({
        url,
        method,
        data: method !== 'GET' ? data : {},
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data; // A JSON parse
    } catch (err) {
      setError(err);
      console.error("Hiba történt az adatlekérés közben:", err);
    } finally {
      setLoading(false);
    }
  };

  return { fetchData, loading, error };
};
export default useAxiosFetch