import {Gantt, Task, EventOption, StylingOption, ViewMode, DisplayOption, viewDate} from 'gantt-task-react';
import "gantt-task-react/dist/index.css";
import {useState, useEffect,useRef} from "react";
import {getTaskByDB} from "./helper";
import {useParams} from "react-router-dom";
import useToken from "../authentication/sign-in/components/useToken";
import MDBox from "../../components/MDBox";
import Grid from "@mui/material/Grid";
import Footer from "../../examples/Footer";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";


function ProjecttimelineByDB() {
    const {token, setToken} = useToken();
    const {projectid} = useParams();

    useEffect(() => {
        getTaskByDB(projectid, token).then(res => {
            console.log(res)
        });

    }, []);




    return (
        <DashboardLayout>
            <MDBox pt={6} pb={3}>
                <Grid container spacing={6}>
                    <Grid item xs={12}>

                    </Grid>
                </Grid>
            </MDBox>
            <Footer/>
        </DashboardLayout>

    );
}

export default ProjecttimelineByDB;