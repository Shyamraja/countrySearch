import { BrowserRouter, Routes, Route } from "react-router-dom";
import Countries from "./components/Countries";
import "./App.css";

function App() {
  return (
      <>
         <div className="header">
           <div className="container">
              <h1>Countries of The Planet Earth</h1>
            </div>
         </div> 
        <div className="container">
          <BrowserRouter>
           <Routes>
           <Route path="/" element={<Countries />}></Route>       
           </Routes>
          </BrowserRouter>
        </div>
      </>
    );  
  }
export default App;
