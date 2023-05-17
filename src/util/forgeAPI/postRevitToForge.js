import readFileChunks from "../util/readFileChunk";
import postJobZip from "./postJobZip"

const getUploadKey = async (token, bucketKey, objectsKey) => {
    console.log("getUploadKey")
    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };

    const url = `https://developer.api.autodesk.com/oss/v2/buckets/${bucketKey}/objects/${objectsKey}/signeds3upload`

    const result = await fetch(url, requestOptions)

    const _result = await result.json()

    return _result.uploadKey
}

const getUploadUrl = async (token, bucketKey, objectsKey, uploadKey, firstPart) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };
    let url=`https://developer.api.autodesk.com/oss/v2/buckets/${bucketKey}/objects/${objectsKey}/signeds3upload?uploadKey=${uploadKey}&firstPart=${firstPart}&parts=1`
    let _url;
    await fetch(url, requestOptions)
      .then(response => response.json())
      .then((result) =>{console.log(result);_url=result.urls})
      .catch(error => {console.log('error', error)});
    return _url[0]
}

const putFile = async (url, chunk) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/plain");

    const requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: chunk
    };

    let _result=true
    await fetch(url, requestOptions)
        .then(response=>response.status)
      .then(response => console.log(response))
      .catch(error => {console.log('error', error);_result=false});
    return _result
}
const finishUpload = async (token, bucketKey,objectKey,uploadKey) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    myHeaders.append("Content-Type", "application/json");
    console.log("finish all upload")
    var raw = JSON.stringify({
      "uploadKey": uploadKey});

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw
    };
    let objectId=''
    let url=`https://developer.api.autodesk.com/oss/v2/buckets/${bucketKey}/objects/${objectKey}/signeds3upload`

    const result=await fetch(url, requestOptions)
    const _result=await result.json()
    console.log(_result)
    return btoa(_result.objectId)

}


const postRevitToForge = async (token, bucketKey, file, processCall,callbackmessage) => {
    const CHUNK_SIZE = 5242880; // 1KB
    const chunkCount = Math.ceil(file.size / CHUNK_SIZE)
    let start = 0
    let chunk;
    let max = 0
    const objectKey=file.name;
    const uploadKey = await getUploadKey(token, bucketKey, objectKey);
    while (chunkCount > start && max < 10) {
        console.log("start to run " + start)
        let url = await getUploadUrl(token, bucketKey,objectKey,uploadKey, start + 1)

        chunk = await readFileChunks(file, CHUNK_SIZE, start);

        let result =await putFile(url,chunk);


        if (result){
            start=start+1;
            processCall((start/chunkCount)*100)
            callbackmessage(`上传 ${start}\n`)
            max=0;
            console.log("finish upload part:"+start)
        }
        else {
            max=max+1;
        }

    }

    const urn=await finishUpload(token,bucketKey,objectKey,uploadKey);

    callbackmessage(`上传 完成 ${urn}\n`)

    const _urn=await postJobZip(token,urn)

    callbackmessage(`开始转换\n`)

    return [objectKey,_urn]
}

export {postRevitToForge};