import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { store } from "./store/store";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux/es";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
