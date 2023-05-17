import getAuth from "./getAuth";

const fetchMetaData = async (token,urn) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        credentials: 'omit',
    };
    let url = `https://developer.api.autodesk.com/modelderivative/v2/designdata/${urn}/metadata`

    const _result=await fetch(url, requestOptions);

    if (_result.ok){
        return await _result.json();
    }
    else {
        console.log(await _result.text())
        throw new Error("fetchMetaData fail")
    }
}

export default fetchMetaData;