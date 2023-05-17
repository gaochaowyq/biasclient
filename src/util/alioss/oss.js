import {ossregion, accessKeyId, accessKeySecret, bucketName} from "util/alioss/ossSetting";
import OSS from "ali-oss";



const getOssObject = async (bucketkey, filename) => {
    const client = new OSS({
        region: ossregion,
        accessKeyId: accessKeyId,
        accessKeySecret: accessKeySecret,
        bucket: bucketkey,
    });
    const result = await client.get(filename)

    return result.content
}

const getOssObjects = async (bucketkey, tag) => {
    const client = new OSS({
        region: ossregion,
        accessKeyId: accessKeyId,
        accessKeySecret: accessKeySecret,
        bucket: bucketkey,
    });

    const objects= await client.list()

    //const result = await client.getObjectMeta(objects.objects[0].name);
    //console.log(result)

    return objects
}


const savePDF = async (bucketkey,filename, file, progress) => {
    const client = new OSS({
        region: ossregion,
        accessKeyId: accessKeyId,
        accessKeySecret: accessKeySecret,
        bucket: bucketkey,
    });

  return await client.multipartUpload(filename, file, {
    progress: progress})
}

export {getOssObject,getOssObjects,savePDF}
