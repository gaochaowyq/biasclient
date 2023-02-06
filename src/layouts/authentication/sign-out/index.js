// react-router-dom components


import {ThemeProvider} from "@mui/material/styles";
import themeDark from "assets/theme-dark";
import theme from "assets/theme";
import CssBaseline from "@mui/material/CssBaseline";
import BLogin from "../sign-in"

function SignOut() {
    return (
        <ThemeProvider theme={darkMode ? themeDark : theme}>
            <CssBaseline/>
            <BLogin setToken={setToken}/>
        </ThemeProvider>
    );
}

export default SignOut;
