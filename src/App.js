import React, { useState, useEffect } from "react";
import { Routes,BrowserRouter, Route } from "react-router-dom";
import Countries from "./components/Countries";
import CountryInfo from "./components/CountryInfo";
import styles from "./components/styles/country.css";



function App() {

  

  return (
    <>
      <div className="header">
          <h5>Countries in this planet</h5>    
      </div>
      <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Countries />} />
          <Route path="/country/:countryName" element={<CountryInfo />} />
        </Routes>
      </BrowserRouter>
      </div>
    </>
  );
}

export default App;
