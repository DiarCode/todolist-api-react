import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { store } from "./store/store";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux/es";
import { QueryClientProvider } from "react-query";
import { queryClient } from "./api/api";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <App />
      </Provider>
    </QueryClientProvider>
  </BrowserRouter>
);
