import getAuth from "./getAuth";

const fetchObjectTree = async (urn, modelid) => {
    let token = await getAuth()
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    var raw = JSON.stringify({
        "query": {
            "$eq": [
                "name",
                "房间"
            ]
        },
        "fields": [
            "objectid",
            "name",
            "externalId",
            "properties.Construction.*"
        ],
        "pagination": {
            "offset": 0,
            "limit": 20
        },
        "payload": "text"
    });

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        credentials: 'omit',
    };
    let url = `https://developer.api.autodesk.com/modelderivative/v2/designdata/${urn}/metadata/${modelid}`
    var data = await fetch(url, requestOptions)
        .then(response => {
            return response.json()
        })
        .catch(error => console.log('error', error.toString()));
    return data

}

export default fetchObjectTree;