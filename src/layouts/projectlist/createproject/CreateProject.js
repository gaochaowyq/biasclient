import * as React from 'react';
import {useForm} from "react-hook-form";
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import {useState, useEffect, useContext} from "react";
import MDProgress from "../../../components/MDProgress";
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import {createBucket} from "../../../util/forgeAPI/Bucket";
import {authContext} from "../../../context/AuthContext";
import useForgeToken from "../../../util/forgeAPI/useForgeToken";
import {CHSToBase64} from "../../../util/util/base64CHS";
import GeoPicker from "./geoPicker";
import {createProject} from "../../../util/bimmanagementAPI/fetchProject";
import MDBox from "../../../components/MDBox";
import Grid from "@mui/material/Grid";
import Footer from "../../../examples/Footer";
import {useNavigate} from "react-router-dom";

const theme = createTheme();


export default function CreateProject() {

    const {register, handleSubmit, watch, formState: {errors}} = useForm();
    const {token, admin} = useContext(authContext);
    const forgetoken = useForgeToken();
    const navigate=useNavigate();
    const [keys, setKeys] = useState([
        {key: 'name', name: '项目名称', type: 'input'},
        {
            key: 'info.type',
            name: '建筑类型',
            type: 'select',
            selection: ['公共建筑', '住宅建筑', '交通建筑', '教育建筑']
        },
        {
            key: 'info.status',
            name: '阶段',
            type: 'select',
            selection: ['方案设计阶段', '初步设计阶段', '扩大初步设计阶段', '施工图设计阶段']
        },
        {key: 'info.design_info.projectmanager_info.name', name: '项目经理', type: 'input'}
    ])
    const [open, setOpen] = useState(false);
    const [progress, setProgess] = useState(50);
    const [geolocation, setGeoLocation] = useState([0, 0]);
    const onSubmit = data => {
        if (geolocation[0]===0||geolocation[1]===0){
            alert("请选择位置")
            return
        }
        data.info.log = geolocation[0]
        data.info.lat = geolocation[1]

        const c = CHSToBase64(data.name)
        data.info.bucketkey=c;
        createProject(token,data).then(res=>{
            createBucket(forgetoken,res.info.bucketkey).then(res=>{
                navigate('/projectlist')

                }

            )
        }).catch(error => alert(error))

        //postRevitToForge(forgetoken,'fortrans',file,progressCallback)
        //setOpen(true)
    }


    const handleClose = (event) => {

    }
    return (
        <DashboardLayout>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Dialog onClose={handleClose} open={open}>
                    <DialogTitle>上传进度</DialogTitle>
                    <MDProgress sx={{width: "500px", height: "50px"}} value={progress}/>
                </Dialog>
                <Container component="main" maxWidth="sm" sx={{mb: 4}}>
                    <Paper variant="outlined" sx={{my: {xs: 3, md: 6}, p: {xs: 2, md: 3}}}>
                        <Typography component="h1" variant="h4" align="center">
                            创建项目
                        </Typography>
                        <MDBox py={3}>
                            <Grid container spacing={3}>
                                <Grid item xs={3} md={6} lg={8}>
                                    <MDBox mb={1.5}>
                                        <GeoPicker geoPick={setGeoLocation}/>
                                    </MDBox>
                                </Grid>
                                <Grid item xs={3} md={3} lg={3}>
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        {
                                            keys.map(
                                                (item, index) => {
                                                    switch (item.type) {
                                                        case 'input':
                                                            return <TextField key={index} label={item.name}
                                                                              defaultValue="" {...register(item.key, {required: true})} />
                                                        case 'select':
                                                            return <TextField select key={index}
                                                                              defaultValue={item.selection[0]}
                                                                              label={item.name} {...register(item.key, {required: true})}>
                                                                {
                                                                    item.selection.map(
                                                                        (p, i) => {
                                                                            return <MenuItem key={i}
                                                                                             value={p}>{p}</MenuItem>

                                                                        }
                                                                    )
                                                                }
                                                            </TextField>
                                                        case 'file':
                                                            return <TextField type={"file"} key={index}
                                                                              defaultValue="" {...register(item.key, {required: true})} />

                                                    }

                                                }
                                            )
                                        }

                                        <TextField type="submit">提交</TextField>
                                    </form>

                                </Grid>

                            </Grid>

                        </MDBox>
                    </Paper>
                </Container>
            </ThemeProvider>
            <Footer/>
        </DashboardLayout>
    );
}