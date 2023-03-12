import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { StateProvider } from "./utilities/StateProvider";
import reducer, { initialState } from "./utilities/reducer";
import ErrorBoundary from "./components/errorBoundary/ErrorBoundary";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ErrorBoundary>
        <StateProvider initialState={initialState} reducer={reducer}>
          <App />
        </StateProvider>
      </ErrorBoundary>
    </BrowserRouter>
  </React.StrictMode>
);
