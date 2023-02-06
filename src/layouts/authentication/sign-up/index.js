/**

 */

// react-router-dom components
import {Link} from "react-router-dom";
// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import {useState, useEffect} from "react";
import BSignUp from "util/bimmanagementAPI/BSignUp";

import {useNavigate} from "react-router-dom";
import MDModal from "components/MDModal";
import fetchBuildings from "../../../util/bimmanagementAPI/fetchBuildings";

// Images
function Cover() {
    const [username, setUserName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [password2, setPassword2] = useState();
    const [isregistered, setIsregistered] = useState(false);
    const [message, setMessage] = useState("");
    const [erroropen, setErrorOpen] = useState(false);
    const navigate=useNavigate()
    const handleClose = () => setErrorOpen(false);

    const handleSignUp = () => {
        setErrorOpen(true)
        if (password!==password2){
            setMessage("密码两次输入不对应");
            return;
        }
        BSignUp(username, email, password, password2).then(
            res => {
                setMessage(res.message)
                if (res.status===200){
                    setTimeout(100)
                    navigate('/projecttable')
                }
            })

    }

    return (
        <Card>
            <MDModal open={erroropen} handleClose={handleClose} Title={"注册信息"} Message={message}/>
            <MDBox
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="success"
                mx={2}
                mt={-3}
                p={3}
                mb={1}
                textAlign="center"
            >
                <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                    注册用户
                </MDTypography>
                <MDTypography display="block" variant="button" color="white" my={1}>
                    添加用户名、邮箱、密码注册
                </MDTypography>
            </MDBox>
            <MDBox pt={4} pb={3} px={3}>
                <MDBox component="form" role="form">
                    <MDBox mb={2}>
                        <MDInput type="text" label="用户名" variant="standard" onChange={e => setUserName(e.target.value)}
                                 fullWidth/>
                    </MDBox>
                    <MDBox mb={2}>
                        <MDInput type="email" label="邮箱" variant="standard" onChange={e => setEmail(e.target.value)}
                                 fullWidth/>
                    </MDBox>
                    <MDBox mb={2}>
                        <MDInput type="password" label="密码" variant="standard"
                                 onChange={e => setPassword(e.target.value)} fullWidth/>
                    </MDBox>
                    <MDBox mb={2}>
                        <MDInput type="password" label="重复密码" variant="standard"
                                 onChange={e => setPassword2(e.target.value)} fullWidth/>
                    </MDBox>
                    <MDBox display="flex" alignItems="center" ml={-1}>
                        <Checkbox/>
                        <MDTypography
                            variant="button"
                            fontWeight="regular"
                            color="text"
                            sx={{cursor: "pointer", userSelect: "none", ml: -1}}
                        >
                            &nbsp;&nbsp;我同意&nbsp;
                        </MDTypography>
                        <MDTypography
                            component="a"
                            href="#"
                            variant="button"
                            fontWeight="bold"
                            color="info"
                            textGradient
                        >
                            Terms and Conditions
                        </MDTypography>
                    </MDBox>
                    <MDBox mt={4} mb={1}>
                        <MDButton variant="gradient" color="info" onClick={handleSignUp} fullWidth>
                            注册
                        </MDButton>
                    </MDBox>
                    <MDBox mt={3} mb={1} textAlign="center">
                        <MDTypography variant="button" color="text">
                            已经有了账户?{" "}
                            <MDTypography
                                component={Link}
                                to="/authentication/sign-in"
                                variant="button"
                                color="info"
                                fontWeight="medium"
                                textGradient
                            >
                                登录
                            </MDTypography>
                        </MDTypography>
                    </MDBox>
                </MDBox>
            </MDBox>
        </Card>
    );
}

export default Cover;
