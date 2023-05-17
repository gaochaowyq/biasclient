import MDProgress from "components/MDProgress";
import MDInput from "components/MDInput";
import MDBox from "components/MDBox";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import {postRevitToForge} from "../../util/forgeAPI/postRevitToForge";
import useForgeToken from "../../util/forgeAPI/useForgeToken";
import {fetchBuilding, updateBuilding} from "../../util/bimmanagementAPI/fetchBuildings";
import {fetchSubProject} from "../../util/bimmanagementAPI/fetchSubProject";
import {fetchProject} from "../../util/bimmanagementAPI/fetchProject";
import {useContext, useState} from "react";
import {authContext} from "../../context/AuthContext";
import {useParams, useNavigate} from "react-router-dom";
import * as React from "react";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from '@mui/material/TextField';


const UploadRevitToForge = () => {
    const {token, admin} = useContext(authContext);
    const {id} = useParams();
    const [percent, setPercent] = useState(0);
    const [processmessage, setProcessMessage] = useState("开始上传\n");
    const forgeToken = useForgeToken();
    const navigate = useNavigate();


    const handleChange = async (event) => {
        const files = Array.from(event.target.files);
        const [file] = files;
        const building = await fetchBuilding(token, id);
        const subproject = await fetchSubProject(token, building.subproject);
        const project = await fetchProject(subproject.project, token);
        let bucketkey;
        if (project.info.bucketkey) {
            bucketkey = project.info.bucketkey;
        } else {
            bucketkey = "fortrans"
        }
        const uri_forge = building.info.uri_forge;
        if (uri_forge) {
            alert("更新文件")
            await postRevitToForge(forgeToken, bucketkey, file, setPercent,(message)=>setProcessMessage(processmessage+ message))
        } else {
            alert("上传新文件")
            const [objectkey, urn] = await postRevitToForge(forgeToken, bucketkey, file, setPercent,(message)=>setProcessMessage(processmessage+ message))
            building.info.uri_forge = urn
            building.info.objectKey = objectkey
            await updateBuilding(token, id, building)
        }

    };
    return (
        <DashboardLayout>
            <Container component="main" maxWidth="sm" sx={{mb: 4}}>
                <Paper variant="outlined" sx={{my: {xs: 3, md: 6}, p: {xs: 2, md: 3}}}>
                    <Typography component="h1" variant="h4" align="center">
                        上传Revit文件
                    </Typography>
                    <MDBox py={3}>
                        <TextField
                            id="outlined-multiline-static"
                            label="上传进程记录"
                            multiline
                            rows={4}
                            defaultValue="开始上传"
                            value={processmessage}
                            fullWidth={true}
                        />
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={12} lg={12}>
                                <MDProgress value={percent}/>
                                <MDInput type="file" onChange={handleChange}/>
                            </Grid>

                        </Grid>

                    </MDBox>
                </Paper>
            </Container>

        </DashboardLayout>
    )
}

export default UploadRevitToForge