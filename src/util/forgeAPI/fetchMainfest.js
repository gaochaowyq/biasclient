
/// <reference path="fetchMainfest.d.ts" />
const fetchMainfest = async (token,urn) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        //credentials: "omit",
    };
    let url = `https://developer.api.autodesk.com/modelderivative/v2/designdata/${urn}/manifest`
    const _result = await fetch(url, requestOptions)
    if (_result.ok) {

        return await _result.json();

    }
    else {
        return await _result.text();
    }

}
export {fetchMainfest}