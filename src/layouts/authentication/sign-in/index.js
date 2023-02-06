/**
 =========================================================
 * Material Dashboard 2 React - v2.1.0
 =========================================================

 * Product Page: https://www.creative-tim.com/product/material-dashboard-react
 * Copyright 2022 Creative Tim (https://www.creative-tim.com)

 Coded by www.creative-tim.com

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 */

import {useState} from "react";
import {useNavigate} from "react-router-dom";
// react-router-dom components
import {Link, Navigate} from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
import PropTypes from 'prop-types';
// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import brandWhite from "assets/images/logo-ct.png";
import BAuth from "util/bimmanagementAPI/BAuth";
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

function Basic({setToken}) {
    const [rememberMe, setRememberMe] = useState(false);
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const handleSubmit = async e => {
        e.preventDefault();
        const token = await BAuth(
            username,
            password
        );
        if (token !== null && token !== undefined) {
            setToken(token);
            window.location.reload()
        } else {
            setAnchorEl(e.nativeEvent.originalTarget);
        }
    }

    const handleSetRememberMe = () => setRememberMe(!rememberMe);

    return (
        <BasicLayout image={bgImage}>
            <Card>
                <MDBox
                    variant="gradient"
                    bgColor="info"
                    borderRadius="lg"
                    coloredShadow="info"
                    mx={2}
                    mt={-3}
                    p={2}
                    mb={1}
                    textAlign="center"
                >
                    <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                        建筑信息时空大数据平台
                    </MDTypography>
                    <Grid container spacing={3} justifyContent="center" sx={{mt: 1, mb: 2}}>
                        <MDBox component="img" src={brandWhite} alt="Brand" width="2rem"/>

                    </Grid>
                </MDBox>
                <MDBox pt={4} pb={3} px={3}>
                    <MDBox component="form" role="form">
                        <MDBox mb={2}>
                            <MDInput type="email" label="Email" onChange={e => setUserName(e.target.value)} fullWidth/>
                        </MDBox>
                        <MDBox mb={2}>
                            <MDInput type="password" label="Password" onChange={e => setPassword(e.target.value)}
                                     fullWidth/>
                        </MDBox>
                        <MDBox display="flex" alignItems="center" ml={-1}>
                            <Switch checked={rememberMe} onChange={handleSetRememberMe}/>
                            <MDTypography
                                variant="button"
                                fontWeight="regular"
                                color="text"
                                onClick={handleSetRememberMe}
                                sx={{cursor: "pointer", userSelect: "none", ml: -1}}
                            >
                                &nbsp;&nbsp;记住我
                            </MDTypography>
                        </MDBox>
                        <MDBox mt={4} mb={1}>
                            <MDButton onClick={handleSubmit} variant="gradient" color="info" fullWidth>
                                登录
                            </MDButton>
                        </MDBox>
                        <Popover
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                        >
                            <Typography sx={{p: 1}}>用户或用户名错误，请重新输入</Typography>
                        </Popover>
                        <MDBox mt={3} mb={1} textAlign="center">
                            <MDTypography variant="button" color="text">
                                Don&apos;t have an account?{" "}
                                <MDTypography
                                    component={Link}
                                    to="/authentication/sign-up"
                                    variant="button"
                                    color="info"
                                    fontWeight="medium"
                                    textGradient
                                >
                                    Sign up
                                </MDTypography>
                            </MDTypography>
                        </MDBox>
                    </MDBox>
                </MDBox>
            </Card>
        </BasicLayout>
    );
}

Basic.propTypes = {
    setToken: PropTypes.func.isRequired
};
export default Basic;
