import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/pages/routes";
import "./index.css";
import { DataProvider } from "./DataContext";
import { Toaster } from "./components/ui/toaster";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <DataProvider>
      <App />
      <Toaster />
    </DataProvider>
  </React.StrictMode>
);
