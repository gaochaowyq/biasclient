// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Footer from "examples/Footer";
// Data
import {useState, useEffect, useContext} from "react";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import PageLayout from "../../examples/LayoutContainers/PageLayout";
import {authContext} from "context/AuthContext";
import {BatChatGptCom} from "../../examples/BatChatGpt";
import {useNavigate} from "react-router-dom";

function BatChagGPT() {
    const {token, admin} = useContext(authContext)
    const navigate = useNavigate();

    useEffect(() => {

    }, []);


    return (
        <PageLayout>
            <MDBox pt={6} pb={3}>
                <Grid container spacing={6}>
                    <Grid item xs={12}>
                        <BatChatGptCom token={token}/>
                    </Grid>
                </Grid>
            </MDBox>
            <Footer/>
        </PageLayout>
    );
}

export default BatChagGPT;