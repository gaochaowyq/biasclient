import {url, token} from "./setting";

/**
 * Returns Price By API
 * @param {number} projectid mcoder of price.
 * @return {json}
 */
const fetchProjectViewer = async (projectid) => {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    var requestOptions = {
        method: 'GET',
        headers: myHeaders
    };
    const _url = `${url}/bimmanage/api/project/${projectid}/getprojectviewer/`

    return await fetch(_url, requestOptions)
        .then(response => response.json())
        .then(result => {
            return result
        })
        .catch(error => {console.log('error', error);return null});
}

const postProjectViewer = async (projectid,_viewerState) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(_viewerState)
    };
    const _url = `${url}/bimmanage/api/project/${projectid}/updateprojectviewer/`

    return await fetch(_url, requestOptions)
        .then(response => response.json())
        .then(result => {
            return result
        })
        .catch(error => console.log('error', error));
}
export {fetchProjectViewer,postProjectViewer}