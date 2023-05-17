import fetchSpecificProperties from "./FetchSpecificProperties";
import {fetchMainfest} from "./fetchMainfest";

async function fetchBuildingElements(token, urn, modelid, isENU) {
    const _mainfest = await fetchMainfest(token, urn);
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
    if (isENU) {
        query = queryEUN
    } else {
        query = queryCHS
    }

    let result = []
    let isFinish = false

    while (!isFinish) {
        let c;
        c = await fetchSpecificProperties(token, urn, modelid, query)
        console.log(c)
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

const fetchBuildingElmentsByCoder = async (token, urn, modelid, coder,offset=0) => {
    const queryENU = {
        "query": {
            "$contains":
                [
                    "properties.Identity Data.Assembly Code",
                    `${coder}`
                ]
        },
        "fields": [
            "objectid",
            "name",
            "properties.*"
        ],
        "pagination": {
            "offset": offset,
            "limit": 1000
        },
        "payload": "text"
    }
    const queryCHS = {
        "query": {
            "$contains":
                [
                    "properties.标识数据.部件代码",
                    `${coder}`
                ]
        },
        "fields": [
            "objectid",
            "name",
            "properties.*"
        ],
        "pagination": {
            "offset": offset,
            "limit": 1000
        },
        "payload": "text"
    }
        let c;
        try {
            c = await fetchSpecificProperties(token, urn, modelid, queryCHS)
        } catch (e) {
            c = await fetchSpecificProperties(token, urn, modelid, queryENU)
        }

    return c.data.collection

}


const fetchBuildingCoders = async (token, urn, modelid) => {
    const queryENU = {
        "query": {
            "$contains":
                [
                    "properties.Identity Data.Assembly Code",
                    `${coder}`
                ]
        },
        "fields": [
            "objectid",
            "name",
            "properties.*"
        ],
        "pagination": {
            "offset": offset,
            "limit": 1000
        },
        "payload": "text"
    }
    const queryCHS = {
        "query": {
            "$contains":
                [
                    "properties.标识数据.部件代码",
                    `${coder}`
                ]
        },
        "fields": [
            "objectid",
            "name",
            "properties.*"
        ],
        "pagination": {
            "offset": offset,
            "limit": 1000
        },
        "payload": "text"
    }
        let c;
        try {
            c = await fetchSpecificProperties(token, urn, modelid, queryCHS)
        } catch (e) {
            c = await fetchSpecificProperties(token, urn, modelid, queryENU)
        }

    return c.data.collection

}


export {fetchBuildingElements, fetchBuildingElmentsByCoder};