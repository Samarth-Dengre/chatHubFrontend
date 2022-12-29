import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store/index";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { ToastContainer } from "react-toastify";

const container = document.getElementById("root");
const root = createRoot(container);
let persistor = persistStore(store);

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
      <ToastContainer/>
    </PersistGate>
  </Provider>
);
