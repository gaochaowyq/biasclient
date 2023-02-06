import getAuth from "./getAuth";

const fetchMetaData = async (urn) => {
    let token = await getAuth()
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        credentials: 'omit',
    };
    let url = `https://developer.api.autodesk.com/modelderivative/v2/designdata/${urn}/metadata`

    return await fetch(url, requestOptions)
        .then(response => response.json())
        .then(response => response.data.metadata)
        .catch(error => console.log('error', error));
}

export default fetchMetaData;