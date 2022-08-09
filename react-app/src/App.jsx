import React, { useState } from "react";
import { Pets } from "./components/pets/Pets";
import Dashboard from './components/Dashboard/Dashboard';
import Login from "./components/Login/Login";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App = () => {
  const [token, setToken] = useState();

  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
    <div className="wrapper">
      <h1>Application</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard/>} />
        </Routes>
      </BrowserRouter>
    </div> 
  );
};

export default App;
