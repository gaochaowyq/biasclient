/**

*/
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { MaterialUIControllerProvider } from "context";

ReactDOM.createRoot(
  document.getElementById('root')
).render(
  <BrowserRouter>
    <MaterialUIControllerProvider>
      <App />
    </MaterialUIControllerProvider>
  </BrowserRouter>
    ,);
