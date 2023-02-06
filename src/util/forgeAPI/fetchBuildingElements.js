import fetchSpecificProperties from "./FetchSpecificProperties";
import {fetchMainfest} from "./fetchMainfest";

async function fetchBuildingElements(urn, modelid, isENU) {
    const _mainfest = await fetchMainfest(urn);
    const queryEUN = {
        "query": {
            "$contains":
                [
                    "properties.Phasing.Phase Created",
                    "新建工程 New Construction"
                ]
        },
        "fields": [
            "objectid",
            "name",
            "properties.*.BAT_Price code",
            "properties.Dimensions.*",
            "properties.Identity Data.Keynote"
        ],
        "pagination": {
            "offset": 0,
            "limit": 1000
        },
        "payload": "text"
    }
    const queryCHS = {
        "query": {
            "$contains":
                [
                    "properties.阶段化.创建的阶段",
                    "新建工程 New Construction"
                ]
        },
        "fields": [
            "objectid",
            "name",
            "properties.*.BAT_Price code",
            "properties.尺寸标注.*",
            "properties.标识数据.*"
        ],
        "pagination": {
            "offset": 0,
            "limit": 1000
        },
        "payload": "text"
    }
    let query;
    if (isENU){
        query=queryEUN
    }else {
        query=queryCHS
    }

    let result = []
    let isFinish = false

    while (!isFinish) {
        let c;
        c = await fetchSpecificProperties(urn, modelid, query)
        if (c.data.collection.length === 0) {
            isFinish = true;
            break
        }
        c.data.collection.forEach(function (element) {
                result.push(element)
            }
        )
        query.pagination.offset += 1000
    }
    return result
}

export default fetchBuildingElements;