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
    } else {
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

const createBuilding = async (token, data) => {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Token ${token}`);

    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(data);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw
    };
    const res = await fetch(`${url}/bimmanage/api/building/`, requestOptions)

    return await res.json()
}

const updateBuilding = async (token, buidlingid, data) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Token ${token}`);

    myHeaders.append("Content-Type", "application/json");


    var raw = JSON.stringify(data);
    console.log(buidlingid, raw)
    var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw
    };
    const res = await fetch(`${url}/bimmanage/api/building/${buidlingid}/`, requestOptions)
    if (res.ok) {
        const result = await res.json()
        alert("更新项目成功")
        return result
    }
    else {
        alert("更新项目失败")
    }

}

export {fetchBuildings, fetchBuilding, createBuilding, updateBuilding}