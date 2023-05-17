import {url,openaiurl} from "./setting";


/**
 * Returns Price By API
 * @param {String} token mcoder of price.

 * @return {json}
 */
const fetchProjects = async (token) => {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Token " + token);

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
const fetchProject = async (buildingid, token) => {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Token " + token);

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

const addProjectTimeline = async (buildingid, task, token) => {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Token " + token);
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
const updateProjectTimeline = async (buildingid, task, token) => {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Token " + token);
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(task)
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
const getProjectTimeline = async (buildingid, token) => {
    console.log(token)
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Token " + token);
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
const createProject = async (token, data) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Token " + token);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(data);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
    };
    const res = await fetch(`${url}/bimmanage/api/project/`, requestOptions)

    return await res.json()
}
const pdfAnalysis = async (prompt, context) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "prompt": prompt,
        "context": context
    });

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw
    };

    const result = await fetch(`${openaiurl}/api/bigtextanalysis/pdfAnalysis/`, requestOptions)
    if (result.ok) {
        return await result.json()
    } else {
        return await result.text()
    }


}
const pdfSummary = async (prompt, context) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "prompt": prompt,
        "context": context
    });

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw
    };

    const result = await fetch(`${openaiurl}/api/bigtextanalysis/pdfSummary/`, requestOptions)
    if (result.ok) {
        return await result.json()
    } else {
        return await result.text()
    }


}

export {pdfSummary,pdfAnalysis,fetchProject, fetchProjects, addProjectTimeline, getProjectTimeline, updateProjectTimeline, createProject}