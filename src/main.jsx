import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./style/global.scss";
import { ContextProvider } from "./context/Context";

export const baseUrl = import.meta.env.VITE_SOME_KEY;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
  </React.StrictMode>,
);
