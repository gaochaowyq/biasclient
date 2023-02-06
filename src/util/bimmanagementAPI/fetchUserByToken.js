import {url} from "./setting";
/**
 * Returns Price By API
 * @param {string} token
 * @return {json}
 */
const fetchUserByToken = async (token) => {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Token "+token);
    var requestOptions = {
        method: 'GET',
        headers: myHeaders
    };
    const _url = `${url}/api-auth/getuser/`

    return await fetch(_url, requestOptions)
        .then(response => response.json())
        .then(result => {
            return result
        })
        .catch(error => console.log('error', error));
}
export {fetchUserByToken}