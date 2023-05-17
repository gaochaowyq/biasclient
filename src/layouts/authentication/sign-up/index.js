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
import {useState} from "react";
import {BSignUp, SamPhone} from "util/bimmanagementAPI/BSignUp";

import {useNavigate} from "react-router-dom";
import PageLayout from "../../../examples/LayoutContainers/PageLayout";
import Stack from '@mui/material/Stack';
import MDAlert from "../../../components/MDAlert";

// Images
function Cover() {

    const [username, setUserName] = useState(null);
    const [email, setEmail] = useState(null);
    const [phone, setPhone] = useState(null);
    const [password, setPassword] = useState();
    const [password2, setPassword2] = useState();
    const [code, setCode] = useState(0);
    const [testcode, setTestCode] = useState(1);
    const [isregistered, setIsregistered] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate()
    const handleClose = () => setErrorOpen(false);

    const handleSignUp = () => {
        let problem=""
        if (password !== password2) {
            problem="密码两次输入不对应、";
        }
        if (testcode !== code) {
            problem=problem+"验证码不正确、";
        }
        if (username === null) {
            problem=problem+"请输入用户名、";
        }
        if (email ===null) {
            problem=problem+"请输入邮箱、";
        }

        if (problem.length!==0){
            setMessage(problem);
            return;
        }


        BSignUp(username, email, password, password2, phone).then(
            res => {
                setMessage(res.message)
                if (res.status === 200) {
                    setTimeout(100)
                    navigate('/authentication/sign-in')
                }
                else {
                    alert(message)
                }
            })

    }
    const getsimcode = () => {
        SamPhone(phone).then(res => {
            setCode(res.code.toString());
            alert("验证码已发送，请查看手机")
        })
    }

    return (
        <PageLayout>
            <Card>
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
                    {
                        message?<MDAlert color={'error'} >{message}</MDAlert>:<></>
                    }


                    <MDBox component="form" role="form">
                        <MDBox mb={2}>
                            <MDInput type="text" label="用户名" variant="standard"
                                     onChange={e => setUserName(e.target.value)}
                                     fullWidth autoFocus={username===null}/>
                        </MDBox>
                        <MDBox mb={2}>
                            <MDInput type="email" label="邮箱" variant="standard"
                                     onChange={e => setEmail(e.target.value)}
                                     fullWidth />
                        </MDBox>

                        <MDBox mb={2}>
                            <Stack direction="row" spacing={1}>

                                <MDInput type="text" label="手机号" variant="standard"
                                         onChange={e => setPhone(e.target.value.toString())}
                                         fullWidth/>


                                <MDInput type="text" sx={{width:250}} label="输入验证码" variant="standard"
                                         onChange={e => setTestCode(e.target.value.toString())}
                                         success={testcode===code}/>

                                <MDButton size={'large'} sx={{width:250}} variant={'contained'} onClick={getsimcode}>
                                    <MDTypography variant="button">获取验证码</MDTypography>
                                </MDButton>

                            </Stack>


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
        </PageLayout>
    );
}

export default Cover;
