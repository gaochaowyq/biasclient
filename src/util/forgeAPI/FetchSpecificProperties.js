import getAuth from "./getAuth";

const FetchSpecificProperties = async (urn, modelid, query) => {
    let token = await getAuth()
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    //myHeaders.append("x-ads-derivative-format", "latest");
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify(
        query
    );

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        credentials: 'omit',
    };
    let url = `https://developer.api.autodesk.com/modelderivative/v2/designdata/${urn}/metadata/${modelid}/properties:query`
    return await fetch(url, requestOptions)
        .then(response => {
            return response.ok ? response.json() : {data: {collection: []}}
        })
        .catch(error => {
            console.log('error', error.toString());
            return {}
        });

}

export default FetchSpecificProperties;