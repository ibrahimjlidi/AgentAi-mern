/**
 * src/main.jsx — React App Bootstrap
 * -------------------------------------
 * This is the first JavaScript file that runs.
 * It mounts the root <App /> component into the <div id="root">
 * in index.html.
 */

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// Mount the React app into the DOM
ReactDOM.createRoot(document.getElementById("root")).render(
  // StrictMode helps catch potential issues during development
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
