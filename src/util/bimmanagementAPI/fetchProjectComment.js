import {url, token} from "./setting";

/**
 * Returns Price By API
 * @param {number} buildingid mcoder of price.
 * @param geometryId
 * @return {json}
 */
const fetchProjectComments = async (buildingid,geometryId) => {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    var requestOptions = {
        method: 'GET',
        headers: myHeaders
    };
    const _url = `${url}/bimmanage/api/bimprojectcomment/?projectid=${buildingid}&geometryId=${geometryId}`

    return await fetch(_url, requestOptions)
        .then(response => response.json())
        .then(result => {
            return result
        })
        .catch(error => console.log('error', error));
}
const fetchAllProjectComments = async (buildingid) => {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    var requestOptions = {
        method: 'GET',
        headers: myHeaders
    };
    const _url = `${url}/bimmanage/api/bimprojectcomment/?projectid=${buildingid}`

    return await fetch(_url, requestOptions)
        .then(response => response.json())
        .then(result => {
            return result
        })
        .catch(error => console.log('error', error));
}

const postProjectComments = async (comment) => {
    //comment:{"projectid":2,"geometryId":11223,"comments":[{"name":"高超","problem":"不知道是什么问1题"}]}
    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(comment)
    };
    const _url = `${url}/bimmanage/api/bimprojectcomment/`

    return await fetch(_url, requestOptions)
        .then(response => response.json())
        .then(result => {
            return result
        })
        .catch(error => console.log('error', error));
}
export {fetchProjectComments,postProjectComments,fetchAllProjectComments}