import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

//Ellenőrzi hogy a kérés HTTPS és átváltja HTTP-re
const checkProtocol = () => {
  const protocol = window.location.protocol;
  let href = window.location.href;
  if (protocol === "https:") {
      window.location.href = href.replace("https:", "http:");
  }
};

// Ellenőrzés lefuttatása közvetlenül az alkalmazás betöltése előtt
checkProtocol();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
