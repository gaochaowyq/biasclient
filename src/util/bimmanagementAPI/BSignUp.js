import {url} from "./setting";

const BSignUp = async (username, email, password, password2,phone) => {
    var formdata = new FormData();
    formdata.append("username", username);
    formdata.append("password", password);
    formdata.append("password2", password2);
    formdata.append("email", email);
    formdata.append("phone", phone);

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
                case 404:
                    signUpResult.status=resopnes.status;
                    signUpResult.message="手机号已被注册"
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

const SamPhone = async (phone) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({"phone":phone});

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw
    };
    const res = await fetch(`${url}/api-auth/phoneauth/`, requestOptions)

    return await res.json()
}



export {BSignUp,SamPhone};