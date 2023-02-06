/*
My React App For Sigle Page Forge View
 */
import routes from "routes";
import BLogin from "layouts/authentication/sign-in/index"

import {useState, useEffect, useMemo} from "react";
import {ThemeProvider, createTheme} from "@mui/material/styles";
import useToken from "./layouts/authentication/sign-in/components/useToken";
import themeLight from "assets/theme";
import CssBaseline from '@mui/material/CssBaseline';

// react-router components
import {Routes, Route, Navigate, useLocation} from "react-router-dom";



export default function __App() {
    const {pathname} = useLocation();
    const {token, setToken} = useToken();
    const handleOnMouseEnter = () => {

    };
    const handleOnMouseLeave = () => {
    };
    const getRoutes = (allRoutes) =>
        allRoutes.map((route) => {
            if (route.collapse) {
                return getRoutes(route.collapse);
            }

            if (route.route) {
                return <Route exact path={route.route} element={route.component} key={route.key}/>;
            }

            return null;
        });

    if (!token) {
        return (
            <ThemeProvider theme={themeLight}>
                <BLogin setToken={setToken}/>
            </ThemeProvider>
        )
    }
    return (
        <ThemeProvider theme={themeLight}>
            <CssBaseline/>
            <Routes>
                {getRoutes(routes)}
                <Route path="*" element={<Navigate to="/projecttable"/>}/>
            </Routes>
        </ThemeProvider>
    );
}
