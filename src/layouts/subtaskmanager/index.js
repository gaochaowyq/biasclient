// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import Footer from "examples/Footer";
// Data
import {useState, useEffect, useContext} from "react";
import PageLayout from "../../examples/LayoutContainers/PageLayout";
import {authContext} from "context/AuthContext";
import {TaskRelation} from "../../component/TaskRelation";
import {useNavigate,useParams} from "react-router-dom";

function SubTaskManager() {
    //const {token, admin} = useContext(authContext)
    //const navigate = useNavigate();
    const {subtaskid}=useParams()

    useEffect(() => {

    }, []);


    return (
        <PageLayout>
            <MDBox pt={6} pb={3}>
                <Grid container spacing={6}>
                    <Grid item xs={12}>

                    </Grid>
                </Grid>
            </MDBox>
            <Footer/>
        </PageLayout>
    );
}

export default SubTaskManager;