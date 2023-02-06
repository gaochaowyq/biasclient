/**
 =========================================================
 * Material Dashboard 2 React - v2.1.0
 =========================================================

 * Product Page: https://www.creative-tim.com/product/material-dashboard-react
 * Copyright 2022 Creative Tim (https://www.creative-tim.com)

 Coded by www.creative-tim.com

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 */

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import {useEffect, useState} from "react";
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import BIMelementsview from "./components/bimelementcomponent";
import getAuth from "util/forgeAPI/getAuth";
import {useParams} from "react-router-dom";
function PriceCal() {
    const [token, setToken] = useState("");
    const {id} = useParams();

    useEffect(() => {
        getAuth().then(res=>{setToken(res);})
    },[]);


    return (
        <DashboardLayout>
            <DashboardNavbar/>
            <MDBox pt={1} height={1000}>
               <BIMelementsview buildingid={id}/>
            </MDBox>
            <Footer/>
        </DashboardLayout>
    );
}

export default PriceCal;
