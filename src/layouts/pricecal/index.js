// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import {useContext, useEffect, useState} from "react";
import Footer from "examples/Footer";
import FunPageLayout from "../../examples/LayoutContainers/FunPageLayout";
import BIMelementsview from "./components/BIMelementsview";
import {useParams} from "react-router-dom";
import {authContext} from "../../context/AuthContext";
import CategoryCoder from "../../component/CategoryCoder";

function PriceCal() {
    const {token, admin} = useContext(authContext);
    const [coder,setCoder]=useState("14-10.20.18");
    const {id} = useParams();
    const CategoryCallBack=(e,nodeid)=>{
        setCoder(nodeid)
    }

    return (
        <FunPageLayout>

            <Grid container spacing={3} sx={{height: "90vh"}}>
                <Grid item xs={6} md={6} lg={3}>
                    <CategoryCoder codernumber={14} CallBack={CategoryCallBack}/>
                </Grid>
                <Grid item xs={6} md={6} lg={9}>
                    <BIMelementsview buildingid={id} coder={coder}/>

                </Grid>
            </Grid>

            <Footer/>
        </FunPageLayout>
    );
}

export default PriceCal;
