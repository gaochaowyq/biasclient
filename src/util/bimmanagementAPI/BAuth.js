import {url} from "./setting";
const BAuth=async (username,password)=>{
    var formdata = new FormData();
    formdata.append("username", username);
    formdata.append("password", password);

    var requestOptions = {
      method: 'POST',
      body: formdata,
    };
    return await fetch(`${url}/api-token-auth/`, requestOptions)
      .then(response => response.json())
      .then(result => {return result.token})
      .catch(error => {console.log('error', error);return null});
}

export  default BAuth;