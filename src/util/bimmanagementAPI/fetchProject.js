import {url} from "./setting";


/**
 * Returns Price By API
 * @param {String} token mcoder of price.

 * @return {json}
 */
const fetchProjects = async (token) => {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Token "+token);

    var formdata = new FormData();

    var requestOptions = {
        method: 'GET',
        headers: myHeaders
    };
    const _url = `${url}/bimmanage/api/project/`

    return await fetch(_url, requestOptions)
        .then(response => response.json())
        .then(result => {
            return result
        })
        .catch(error => console.log('error', error));
}
const fetchProject = async (buildingid,token) => {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Token "+token);

    var formdata = new FormData();

    var requestOptions = {
        method: 'GET',
        headers: myHeaders
    };
    const _url = `${url}/bimmanage/api/project/${buildingid}`

    return await fetch(_url, requestOptions)
        .then(response => response.json())
        .then(result => {
            return result
        })
        .catch(error => console.log('error', error));
}

const addProjectTimeline = async (buildingid, task,token) => {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Token "+token);
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: task
    };
    const _url = `${url}/bimmanage/api/project/${buildingid}/addprojecttimeline/`
    console.log(_url)

    return await fetch(_url, requestOptions)
        .then(response => response.json())
        .then(result => {
            return result
        })
        .catch(error => console.log('error', error));
}
const updateProjectTimeline = async (buildingid, task,token) => {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Token "+token);
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body:JSON.stringify(task)
    };
    const _url = `${url}/bimmanage/api/project/${buildingid}/updateprojecttimeline/`
    console.log(_url)
    return await fetch(_url, requestOptions)
        .then(response => response.json())
        .then(result => {
            return result
        })
        .catch(error => console.log('error', error));
}


const getProjectTimeline = async (buildingid,token) => {
    console.log(token)
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Token "+token);
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };
    const _url = `${url}/bimmanage/api/project/${buildingid}/getprojecttimeline/`

    return await fetch(_url, requestOptions)
        .then(response => response.json())
        .then(result => {
            return result
        })
        .catch(error => console.log('error', error));
}

export {fetchProject, fetchProjects,addProjectTimeline,getProjectTimeline,updateProjectTimeline}