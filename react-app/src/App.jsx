import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRoutes from "./routes";
import "./styles/main.scss";

toast.configure();

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
