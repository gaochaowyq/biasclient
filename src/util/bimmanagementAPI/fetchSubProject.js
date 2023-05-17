import {url} from "./setting";

/**
 * Returns Price By API
 * @param {string} token
 * @param {int} projectid
 * @return {json}
 */
const fetchSubProjects = async (token,projectid) => {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Token "+token);
    var requestOptions = {
        method: 'GET',
        headers: myHeaders
    };
    const _url = `${url}/bimmanage/api/subproject/?projectid=${projectid}`

    return await fetch(_url, requestOptions)
        .then(response => response.json())
        .then(result => {
            return result
        })
        .catch(error => console.log('error', error));
}
const fetchSubProject = async (token,subprojectid) => {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Token "+token);

    var formdata = new FormData();

    var requestOptions = {
        method: 'GET',
        headers: myHeaders
    };
    const _url = `${url}/bimmanage/api/subproject/${subprojectid}/`

    return await fetch(_url, requestOptions)
        .then(response => response.json())
        .then(result => {
            return result
        })
        .catch(error => console.log('error', error));
}

const createSubProject = async (token,data) => {
var myHeaders = new Headers();
myHeaders.append("Authorization", "Token "+token);
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify(data);

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
};
const res=await fetch(`${url}/bimmanage/api/subproject/`, requestOptions)

return await res.json()
}


export {fetchSubProject, fetchSubProjects,createSubProject}