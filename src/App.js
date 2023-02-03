import { Routes,BrowserRouter, Route } from "react-router-dom";
import Countries from "./components/Countries";
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
        </Routes>
      </BrowserRouter>
      </div>
    </>
  );
}

export default App;
