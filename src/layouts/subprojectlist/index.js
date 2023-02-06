// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import {fetchSubProjects} from "util/bimmanagementAPI/fetchSubProject";

// Data
import subprojectsTableData from "./data/subprojectsTableData";
import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import useToken from "../authentication/sign-in/components/useToken";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

function SubProjectsList() {
    const {token, setToken} = useToken();
    const [subprojects, setSubProjects] = useState([]);
    const {id} = useParams();


    useEffect(() => {
        fetchSubProjects(token, id).then(res => {
            setSubProjects(res);
            console.log(res)
        })
    }, []);


    const {columns: pColumns, rows: pRows} = subprojectsTableData(subprojects);

    return (
        <DashboardLayout>
            <DashboardNavbar/>
            <MDBox pt={6} pb={3}>
                <Grid container spacing={6}>
                    <Grid item xs={12}>
                        <Card>
                            <MDBox
                                mx={2}
                                mt={-3}
                                py={3}
                                px={2}
                                variant="gradient"
                                bgColor="info"
                                borderRadius="lg"
                                coloredShadow="info"
                            >
                                <MDTypography variant="h6" color="white">
                                    子项目列表
                                </MDTypography>
                            </MDBox>
                            <MDBox pt={3}>
                                <DataTable
                                    table={{columns: pColumns, rows: pRows}}
                                    isSorted={false}
                                    entriesPerPage={false}
                                    showTotalEntries={false}
                                    noEndBorder
                                />
                            </MDBox>
                        </Card>
                    </Grid>
                </Grid>
            </MDBox>
            <Footer/>
        </DashboardLayout>
    );
}

export default SubProjectsList;
