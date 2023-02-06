import fetchPrice from "../bimmanagementAPI/fetchPrice";
import fetchMetaData from "../forgeAPI/fetchMetaData";
import fetchSpecificProperties from "../forgeAPI/FetchSpecificProperties";
import parasePriceCoder from "../forgeAPI/parasePriceCoder";

const query = {
    "query": {
        "$contains":
            [
                "properties.Phasing.Phase Created",
                "新建工程"
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

/**
 *
 * @param urn project urn get by uri
 * @param result
 * @returns {Promise<boolean>} if have more object to get
 */
async function perbimpricecal(urn, result = []) {
    let buildingdata = await fetchMetaData(urn)
        .then(result => {
            return result.find((_e) => _e.isMasterView === true)
        })
        .then(res => {
            return fetchSpecificProperties(urn, res.guid, query)
        })
    var name, value, unit, bprice;
    //use to save price data
    var out = {};
    //{"mcoder":"","coder":"","coder_name":"","bprice":0，"unit":""}
    if (buildingdata.data.collection.length === 0) return false
    for (var element of buildingdata.data.collection) {
        let mcoder, coder;
        //let name = element.name;
        try {
            mcoder = element.properties["Identity Data"]["Keynote"]
            coder = element.properties["Identity Data"]["BAT_Price code"]
        } catch (e) {
            console.log("get mocder of coder have problem")
            console.log(element)
        }
        // is element no mcoder or coder skip
        if (!(mcoder || coder)) continue
        coder = parasePriceCoder(coder);
        console.log(coder)
        for (var i of coder) {
            try {
                let _bprice = await fetchPrice(mcoder, i, out)
                unit = _bprice.unit
                switch (unit) {
                    case 'LIFANGMI':
                        // get quality from BIM model
                        value = parseFloat(element.properties["Dimensions"]["Volume"].split(" ")[0]);
                        break;
                    case 'PINGFANGMI':
                        // get quality from BIM model
                        value = parseFloat(element.properties["Dimensions"]["Area"].split(" ")[0]);
                        break
                    case 'T':
                        // get quality from BIM model
                        value = 9.7 * parseFloat(element.properties["Dimensions"]["Volume"].split(" ")[0]);
                        break
                    case 'TAI':
                        // get quality from BIM model
                        value = 1
                        break;
                    case 'ZU':
                        // get quality from BIM model
                        value = 1
                        break;
                    case 'TAO':
                        // get quality from BIM model
                        value = 1
                        break;
                    default:
                        value = 0
                }
                name = _bprice.coder_name;
                bprice = _bprice.bprice * value
                let _check = result.find(element => {
                    return element.coder === i && element.mcoder === mcoder
                })
                if (_check) {
                    _check.bprice += bprice;
                    _check.value += value;
                } else {
                    result.push({
                        "mcoder": mcoder,
                        "coder": i,
                        "name": name,
                        "bprice": bprice,
                        "unit": unit,
                        "value": value
                    })
                }

            } catch (error) {
                console.log(`id：${element.objectid}：${element.name}with error:` + error.message)
            }

        }

    }
    return true;
}

async function bimpricecal(urn) {

    let isChanged = true
    let result = []
    //
    while (isChanged && query.pagination.offset<5000) {
        query.pagination.offset += 1000
        isChanged = await perbimpricecal(urn, result);
    }
    console.log("finish")
    console.log(result)
    return result

}


export default bimpricecal
