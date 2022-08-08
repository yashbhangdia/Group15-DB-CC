import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes";
import "./styles/main.scss";

const App = () => {
  return (
    <Router>
      <main className="h-100">
        <AppRoutes />
      </main>
    </Router>
  );
};

export default App;
