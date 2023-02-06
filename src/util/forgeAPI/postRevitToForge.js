const postRevitToForge = async (token, bucketKey, revitfile) => {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    const reader = new FileReader();
    reader.onload = (evt) => {
        console.log(evt.target.size);
    };
    reader.readAsBinaryString(revitfile.files);
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };
    let url = `https://developer.api.autodesk.com/oss/v2/buckets/${bucketKey}/objects/${objectsKey}/signeds3uploa`

    return await fetch(url, requestOptions)
        .then(response => {
            switch (response.status) {
                case 200:
                    return response.json()
                case 400:
                    return response.text()
                case 401:
                    return response.text()
            }
        })
}

export {postRevitToForge};