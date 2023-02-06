import {url,token} from "./setting";
/**
 * Returns Price By API
 * {token} Project Mangement token
 * @return {json}
 */
const fetchFrogeToken=async()=>{
    const userToken = sessionStorage.getItem('token');
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Token ${userToken}`);
    var requestOptions = {
      method: 'GET',
      headers: myHeaders
    };
    const _url=`${url}/bimmanage/api/forgeauth/`

    return await fetch(_url, requestOptions)
      .then(response => response.json())
      .then(result => {console.log(result); return result})
      .catch(error => console.log('error', error));
}
export default fetchFrogeToken