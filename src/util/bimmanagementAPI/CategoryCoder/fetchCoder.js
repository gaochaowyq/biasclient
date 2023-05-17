import {url} from '../setting'

const fetchCoder = async (token, codernumber) => {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Token ${token}`);

    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };
    const res = await fetch(`${url}/api/buildingtable/${codernumber}/`, requestOptions)
    if (res.ok) {
        return await res.json()
    } else {
        const error = `cant get coder with ${codernumber} number`
        throw new Error(error)


    }


}
export {fetchCoder}