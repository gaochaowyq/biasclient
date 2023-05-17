// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import React, {useContext, useEffect, useState} from "react";
import Footer from "examples/Footer";
import FunPageLayout from "../../examples/LayoutContainers/FunPageLayout";
import {useParams} from "react-router-dom";
import {authContext} from "../../context/AuthContext";
import AllProcessStage from "./components/AllProcessStage";
import allProcessManageTableData from "./data/allProcessManageTableData";
import DataTable from "../../examples/Tables/DataTable";
import {fetchProject} from "../../util/bimmanagementAPI/fetchProject";
import {getOssObjects} from "../../util/alioss/oss";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";


function AllProcessManagement() {
    const {token, admin} = useContext(authContext);
    const [text, setText] = useState();
    const [bucketkey, setBucketkey] = useState();
    const {id} = useParams();
    const [documents, setDocuments] = useState([]);

    const {columns: pColumns, rows: pRows} = allProcessManageTableData(bucketkey, documents);


    useEffect(() => {
        fetchProject(id, token).then(res => {
            const bucketkey = res.info.bucketkey
            setBucketkey(bucketkey)
            getOssObjects(bucketkey, "").then(res => {
                console.log(res.objects)
                setDocuments(res.objects)
            })
        })

    }, [])

    return (
        <FunPageLayout>

            <Grid container spacing={3} sx={{height: "100vh"}}>
                <Grid item xs={0} md={2} lg={2}>
                    <MDBox sx={{overflow: "auto", height: "90vh"}}>
                        <AllProcessStage/>
                    </MDBox>


                </Grid>
                <Grid item xs={12} md={8} lg={8}>
                    <MDBox sx={{overflow: "auto", height: "90vh"}}>
                        <Stack direction="row" spacing={2}>
                            <Typography variant="h1" gutterBottom>
                                文档管理
                            </Typography>
                        </Stack>

                        <DataTable
                            table={{columns: pColumns, rows: pRows}}
                            isSorted={false}
                            entriesPerPage={false}
                            showTotalEntries={false}
                        />


                    </MDBox>
                </Grid>
            </Grid>

            <Footer/>
        </FunPageLayout>
    );
}

export default AllProcessManagement;