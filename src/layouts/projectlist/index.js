// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import {fetchProjects} from "util/bimmanagementAPI/fetchProject";

// Data
import projectsTableData from "./data/projectsTableData";
import {useState, useEffect, useContext} from "react";
import useToken from "../authentication/sign-in/components/useToken";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import useAdmin from 'layouts/authentication/sign-in/components/useAdmin'
import {authContext} from "context/AuthContext";
import CreateProject from "./createproject/CreateProject";
import {useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";

function ProjectsList() {
    const [projects, setProjects] = useState([]);
    const {token, admin} = useContext(authContext)
    const navigate = useNavigate();

    useEffect(() => {
        fetchProjects(token).then(res => {
            setProjects(res);
        })
    }, []);


    const {columns: pColumns, rows: pRows} = projectsTableData(projects);

    const CreateProjectButton = () => {
        return (
            <Button onClick={() => {
                navigate(`/createproject`)
            }}>
                添加建设项目
            </Button>
        )
    }


    return (
        <DashboardLayout>
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
                                    项目列表
                                </MDTypography>
                            </MDBox>
                            <MDBox pt={3}>
                                <CreateProjectButton/>
                                <DataTable
                                    table={{columns: pColumns, rows: pRows}}
                                    isSorted={false}
                                    entriesPerPage={true}
                                    showTotalEntries={false}
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

export default ProjectsList;
