import React from "react";
import { Routes,BrowserRouter, Route } from "react-router-dom";
import Countries from "./components/Countries";
import CountryInfo from "./components/CountryInfo";


function App() {
  return (
    <>
      <div className="header">
          <h5>Find the Countries in this planet</h5>    
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
