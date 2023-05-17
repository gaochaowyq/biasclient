
const FetchSpecificProperties = async (token,urn, modelid, query) => {
    var myHeaders = new Headers();

    console.log(token,urn,modelid,query)
    myHeaders.append("Authorization", token);
    //myHeaders.append("x-ads-derivative-format", "latest");
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify(
        query
    );

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
    };
    const url = `https://developer.api.autodesk.com/modelderivative/v2/designdata/${urn}/metadata/${modelid}/properties:query`

    const _result=await fetch(url, requestOptions)

    if (_result.ok){
        return await _result.json()
    }
    else {
        throw new Error("FetchSpecificProperties fail")
    }
}
export default FetchSpecificProperties;