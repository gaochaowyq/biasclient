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
import {useParams, useNavigate} from "react-router-dom";
import MDButton from "../../../components/MDButton";
import {authContext} from "../../../context/AuthContext";
import {createSubProject} from "../../../util/bimmanagementAPI/fetchSubProject";
import MDBox from "../../../components/MDBox";
import Grid from "@mui/material/Grid";
import theme from "assets/theme";
import Footer from "../../../examples/Footer";
export default function CreateSubProject() {
    const {id} = useParams()
    const navigete = useNavigate()
    const {register, handleSubmit, watch, formState: {errors}} = useForm();
    const {token, admin} = useContext(authContext);
    const [keys, setKeys] = useState([
        {key: 'name', name: '子项名称', type: 'input'}
    ])
    const onSubmit = async (data) => {
        data.project = id
        data.info = {"projectID": null}
        console.log(data)
        createSubProject(token, data).then(res => {
            if (res.name) {
                navigete(`/subprojectlist/${id}`)
            } else {
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
                            创建子项工程
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
                                        <MDButton type="submit">提交</MDButton>
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