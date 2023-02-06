import fetchPrice from "../bimmanagementAPI/fetchPrice";
import fetchMetaData from "../forgeAPI/fetchMetaData";
import fetchBuildingElements from "../forgeAPI/fetchBuildingElements";
import parasePriceCoder from "../forgeAPI/parasePriceCoder";
import {combineElement} from "../helper";

async function bimelements(urn,limit=null) {

    let buildingdata = await fetchMetaData(urn)
        .then(result => {
            var p=result.find((_e) => _e.isMasterView === true)
            var pp=result.find((_e) => _e.role === "3d")
            if(p){
                return p
            }
            else {
                return pp
            }

        })
        .then(res => {
            if (res.name==="New Construction"){return fetchBuildingElements(urn, res.guid,true)}
            else {return fetchBuildingElements(urn, res.guid,false)}
        })
        .catch(error => console.log('error', error.toString()))
    let result = {
        dimensions: ['id','ElementName', 'mcoder', 'coder', 'MaterialName', 'quality', 'unit', 'price'],
        source: []
    }
    var out = [];

    //use to save price data
    let index=0;
    for (var element of buildingdata) {
        let mcoder, coder;
        let name, value, unit, bprice;

        //let name = element.name;
        try {
            mcoder = element.properties["Identity Data"]["Keynote"]
            coder = element.properties["Identity Data"]["BAT_Price code"]
            name = element.name
        } catch (e) {
            console.log(e.message)
            //console.log(element)
            continue
        }
        let elementsource = {
            id:index,
            ElementName: name,
            mcoder: mcoder,
            coder: coder,
            MaterialName: "",
            quality: 0,
            unit: "",
            price: 0
        }
        // is element no mcoder or coder skip
        if (!(mcoder || coder)) continue
        coder = parasePriceCoder(coder);
        for (var i of coder) {
            try {
                let _bprice = await fetchPrice(mcoder, i, out)
                unit = _bprice.unit
                elementsource.unit += unit
                elementsource.MaterialName += _bprice.coder_name

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
                        value = 1
                        break;
                    case 'ZU':
                        value = 1
                        break;
                    case 'TAO':
                        value = 1
                        break;
                    default:
                        value = 0
                }
                elementsource.quality += value
                elementsource.price += _bprice.bprice * value
            } catch (error) {
                console.log(`id：${element.objectid}：${element.name}with error:` + error.message)
            }
        }
        result.source.push(elementsource)
        index++
        if (limit &&index>limit)break
    }

    //var dataframe=new DataFrame(result)


    result.source = combineElement(result.source, "ElementName", ["quality", "price"])
    return result;
}

export default bimelements
