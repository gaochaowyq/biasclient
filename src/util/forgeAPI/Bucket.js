import {baseUrl} from "./setting";

const createBucket = async (token, bucketname) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    myHeaders.append("Content-Type", "application/json; charset=utf-8");

    var raw = {
        "bucketKey": bucketname,
        "policyKey": "persistent"
    }
    console.log(bucketname)
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(raw),
    };

    fetch(`${baseUrl}/oss/v2/buckets`, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}

export {createBucket}