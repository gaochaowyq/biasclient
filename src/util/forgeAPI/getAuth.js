import {client_id, client_secret} from "./setting";
import fetchForgeToken from "../bimmanagementAPI/fetchForgeToken";

const getAuth = async () => {
    let token;
    token = sessionStorage.getItem('forgetoken')
    if (token) {
        return token
    } else {
        /*
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        var urlencoded = new URLSearchParams();
        urlencoded.append("grant_type", "client_credentials");
        urlencoded.append("client_id", client_id);
        urlencoded.append("client_secret", client_secret);
        urlencoded.append("scope", "data:read data:write data:create bucket:read bucket:create");
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
        };
        return await fetch("https://developer.api.autodesk.com/authentication/v1/authenticate", requestOptions)
            .then(response => response.json())
            .then((result) => {
                console.log(result.access_token)
                sessionStorage.setItem('forgetoken', result.access_token);
                setTimeout(function () {
                    sessionStorage.removeItem('forgetoken');
                }, (5 * 10 * 1000));
                return result.access_token;
            })
            .catch(error => console.log('error', error))

         */
        const forgeToken= await fetchForgeToken();
        console.log(forgeToken)
        return forgeToken
    }


}
export default getAuth;