/**

 */
import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter} from "react-router-dom";
import App from "./App";
import {MaterialUIControllerProvider} from "context";
import {AuthProvider} from "./context/AuthContext";

ReactDOM.createRoot(
    document.getElementById('root')
).render(
    <BrowserRouter>
        <MaterialUIControllerProvider>
            <AuthProvider>
                <App/>
            </AuthProvider>
        </MaterialUIControllerProvider>
    </BrowserRouter>
    );
