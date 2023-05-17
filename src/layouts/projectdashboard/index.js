/*
use to analysis all project data,and let me know all overrool,abuout projects
*/
// @mui material components
import Grid from "@mui/material/Grid";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import projectsBarChartData from "./data/projectsBarChartData"
import ProjectMap from "./components/ProjectMap/index"

// Dashboard components
import Projects from "layouts/projectdashboard/components/Projects";
import OrdersOverview from "layouts/projectdashboard/components/OrdersOverview";
import {fetchProjects} from "util/bimmanagementAPI/fetchProject";
import {useContext, useEffect, useState} from "react";
import {authContext} from "../../context/AuthContext";

function ProjectDashboard() {
    const [projectcount, setProjectCount] = useState(0)
    const [finishedrate, setFinishedRate] = useState(0)
    const {token} = useContext(authContext);
    const [locations, setLocations] = useState([]);
    const _data=projectsBarChartData();

    useEffect(() => {
        fetchProjects(token).then(res => {
            setProjectCount(res.length);
            var finished = res.filter((item) => item.info.status === "设计");
            setFinishedRate((Math.round((finished.length / res.length) * 100)))
            let _location = res.map((item) => [item.info.Lat, item.info.Log, item.name])
            setLocations(_location)
        })

    }, [])


    return (
        <DashboardLayout>

            {projectcount &&
                <MDBox py={3}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6} lg={3}>
                            <MDBox mb={1.5}>
                                <ComplexStatisticsCard
                                    color="dark"
                                    icon="weekend"
                                    title="项目总数"
                                    count={projectcount}
                                    percentage={{
                                        color: "success",
                                        amount: finishedrate + "%",
                                        label: "设计中",
                                    }}
                                />
                            </MDBox>
                        </Grid>
                        <Grid item xs={12} md={6} lg={3}>
                            <MDBox mb={1.5}>
                            </MDBox>
                        </Grid>
                        <Grid item xs={12} md={6} lg={3}>
                            <MDBox mb={1.5}>
                                <ComplexStatisticsCard
                                    color="success"
                                    icon="store"
                                    title="Revenue"
                                    count="34k"
                                    percentage={{
                                        color: "success",
                                        amount: "+1%",
                                        label: "than yesterday",
                                    }}
                                />
                            </MDBox>
                        </Grid>
                        <Grid item xs={12} md={6} lg={3}>
                            <MDBox mb={1.5}>
                                <ComplexStatisticsCard
                                    color="primary"
                                    icon="person_add"
                                    title="Followers"
                                    count="+91"
                                    percentage={{
                                        color: "success",
                                        amount: "",
                                        label: "Just updated",
                                    }}
                                />
                            </MDBox>
                        </Grid>
                    </Grid>
                    <MDBox>

                        <ProjectMap  locations={locations}/>

                    </MDBox>
                </MDBox>}
            <Footer/>
        </DashboardLayout>
    );
}

export default ProjectDashboard;
