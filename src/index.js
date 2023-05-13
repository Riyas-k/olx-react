import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { FirebaseContext } from "./store/Context";
import Context from "./store/Context";
import { auth } from "./firebase/Config";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Router>
    <FirebaseContext.Provider value={{ auth }}>
      <Context>
        <App />
      </Context>
    </FirebaseContext.Provider>
  </Router>
  // </React.StrictMode>
);