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
import {useParams,useNavigate} from "react-router-dom";

import {authContext} from "../../../context/AuthContext";
import {createBuilding} from "../../../util/bimmanagementAPI/fetchBuildings";
import MDBox from "../../../components/MDBox";
import Grid from "@mui/material/Grid";
import Footer from "../../../examples/Footer";

const theme = createTheme();


export default function CreateBuilding() {
    const {id}=useParams()
    const navigete=useNavigate()
    const {register, handleSubmit, watch, formState: {errors}} = useForm();
    const {token, admin} = useContext(authContext);
    const [keys, setKeys] = useState([
        {key: 'name', name: '项目名称', type: 'input'},
        {key: 'info.design_info.projectmanager_info.name', name: '项目经理', type: 'input'}
    ])

    const onSubmit = async (data) => {
        data.subprojectid=id
        console.log(data)
        createBuilding(token, data).then(res => {
            if (res.name){
                navigete(`/buildinglist/${id}`)
            }
            else {
                alert(`创建失败 with${res}`)
            }
        })
    }

    return (
        <DashboardLayout>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Container component="main" maxWidth="sm" sx={{mb: 4}}>
                    <Paper variant="outlined" sx={{my: {xs: 3, md: 6}, p: {xs: 2, md: 3}}}>
                        <Typography component="h1" variant="h4" align="center">
                            创建单项工程
                        </Typography>
                        <MDBox py={3}>
                            <Grid container spacing={3}>
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

                        </MDBox>}


                    </Paper>
                </Container>
            </ThemeProvider>
            <Footer/>
        </DashboardLayout>
    );
}