import {url} from "./setting";
/**
 * Returns Buildings By Auth token

 * @return {json}
 */
const fetchBuildings = async (token, subprojectid) => {

    var myHeaders = new Headers();
    console.log(token)
    myHeaders.append("Authorization", `Token ${token}`);
    let _url;
    var requestOptions = {
        method: 'GET',
        headers: myHeaders
    };

    if (subprojectid !== undefined) {
        _url = `${url}/bimmanage/api/building/?subprojectid=${parseInt(subprojectid)}`
    }
    else{
        _url = `${url}/bimmanage/api/building/`
    }

        console.log(_url)

        return await fetch(_url, requestOptions)
            .then(response => response.json())
            .then(result => {
                return result
            })
            .catch(error => console.log('error', error));
    }

    const fetchBuilding = async (token, buildingid) => {

        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Token ${token}`);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders
        };
        const _url = `${url}/bimmanage/api/building/${buildingid}/`
        console.log(_url)

        return await fetch(_url, requestOptions)
            .then(response => response.json())
            .then(result => {
                return result
            })
            .catch(error => console.log('error', error));
    }
    export {fetchBuildings, fetchBuilding}