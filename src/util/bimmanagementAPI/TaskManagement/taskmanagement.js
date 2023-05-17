import {url} from "../setting";

const listmaintask = async (projectid) => {
    var myHeaders = new Headers();

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return await fetch(`${url}/taskmanagement/api/maintask/?projectid=${projectid}`, requestOptions)
        .then(response => response.json())
        .then(result => {
            return result
        })
        .catch(error => console.log('error', error));
}

const listsubtask = async (maintaskid) => {
    var myHeaders = new Headers();

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return await fetch(`${url}/taskmanagement/api/subtask/?maintask=${maintaskid}`, requestOptions)
        .then(response => response.json())
        .then(result => {
            return result
        })
        .catch(error => console.log('error', error));
}

const getuserbyid = async (userid) => {

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    return await fetch(`${url}/api-auth/getuserbyid/?userid=${userid}`, requestOptions)
        .then(response => response.json())
        .then(result => {
            return result
        })
        .catch(error => console.log('error', error));
}

export {listmaintask, listsubtask,getuserbyid}