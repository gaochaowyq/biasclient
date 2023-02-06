import {url,token} from "./setting";
/**
 * Returns Price By API
 * @param {Int} buildingid mcoder of price.

 * @return {json}
 */
const fetchBuilding=async(buildingid)=>{

    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    var requestOptions = {
      method: 'GET',
      headers: myHeaders
    };
    const _url=`${url}/bimmanage/api/building/${buildingid}/`

    return await fetch(_url, requestOptions)
      .then(response => response.json())
      .then(result => {return result})
      .catch(error => console.log('error', error));
}
export default fetchBuilding