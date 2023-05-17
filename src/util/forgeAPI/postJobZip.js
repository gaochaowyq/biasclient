const postJobZip = async (token,urn) => {

    const objectId=atob(urn)
    const objectname =objectId.split('/')[1].split('.')[0]
    const myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("x-ads-force", "true");

    const raw = JSON.stringify({
        "input": {
            "urn": urn,
            "compressedUrn": true,
            "rootFilename": `${objectname}.rvt`
        },
        "output": {
            "destination": {
                "region": "US"
            },
            "formats": [
                {
                    "type": "svf2",
                    "views": [
                        "3d",
                        "2d"
                    ],
                    "advanced": {
                        "extractorVersion": "next",
                        "generateMasterViews": true
                    }
                }
            ]
        }
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
    };
    const url="https://developer.api.autodesk.com/modelderivative/v2/designdata/job"
    const res= await fetch(url, requestOptions)

    const result=await res.json()

    return result.urn

}

export default postJobZip
