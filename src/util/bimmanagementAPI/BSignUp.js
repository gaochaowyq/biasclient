import {url} from "./setting";

const BSignUp = async (username, email, password, password2) => {
    var formdata = new FormData();
    formdata.append("username", username);
    formdata.append("password", password);
    formdata.append("password2", password2);
    formdata.append("email", email);

    var requestOptions = {
        method: 'POST',
        body: formdata,
    };
    let signUpResult = {status:"",message:""}
    return fetch(`${url}/api-auth/register/`, requestOptions)
        .then(resopnes => {
            switch (resopnes.status) {
                case 200:
                    signUpResult.status=resopnes.status;
                    signUpResult.message="成功创建用户"
                    return signUpResult;
                case 400:
                    signUpResult.status=resopnes.status;
                    signUpResult.message="邮箱重复，请重新选择邮箱"
                    return signUpResult;
                default:
                    console.log(resopnes.status)
                    return "resopnes:Default";
            }
        })
        .catch(error => {
            console.log('error', error);
            return null
        });
}

export default BSignUp;