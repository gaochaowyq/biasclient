import getAuth from "./getAuth";

/// <reference path="fetchMainfest.d.ts" />
const fetchMainfest= async (urn)=>
{
    let token=await getAuth()
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+token);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
        credentials: "omit",
    };
    let url=`https://developer.api.autodesk.com/modelderivative/v2/designdata/${urn}/manifest`

    return  await fetch(url, requestOptions)
      .then(response => response.json())
      .then(response=>response)
      .catch(error => console.log('error', error));
}

export {fetchMainfest};