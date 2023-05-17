import fetchPrice from "../../../util/bimmanagementAPI/fetchPrice";
import fetchMetaData from "../../../util/forgeAPI/fetchMetaData";
import {fetchBuildingElmentsByCoder} from "../../../util/forgeAPI/fetchBuildingElements";
import parasePriceCoder from "../../../util/forgeAPI/parasePriceCoder";
import {combineElement} from "../../../util/helper";

async function _bimelements(token, urn, limit = null) {
    const _metadata = await fetchMetaData(token, urn)
    const metadata = _metadata.data.metadata.find((_e) => _e.role === "3d")
    const buildingdata = await fetchBuildingElmentsByCoder(token, urn, metadata.guid, "14-10.20.18", 0)
    let result = {
        dimensions: ['id', 'ElementName', 'mcoder', 'coder', 'MaterialName', 'quality', 'unit', 'price'],
        source: []
    }
    var out = [];

    //use to save price data
    let index = 0;
    /*
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
            id: index,
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
        if (limit && index > limit) break
    }
    */
    //var dataframe=new DataFrame(result)

    return {
        columns: [
            {Header: "子项目名称", accessor: "name", width: "30%", align: "left"},
            {Header: "项目类型", accessor: "type", align: "left"},
            {Header: "进入项目", accessor: "subprojectenter", align: "center"},
            {Header: "修改子项目", accessor: "subprojectmodify", align: "center"},
            {Header: "创建时间", accessor: "createdata", align: "center"}
        ],

        rows: subprojects.map(item => {
            return (isadmin ? {
                    name: <SubProjectname name={item.name}/>,
                    subprojectenter: (
                        <div>
                            <SubProjectEnter id={item.id}/>
                        </div>),
                    subprojectmodify: (
                        <div>
                            <SubProject_Modify id={item.id}/>
                        </div>),
                    createdata: (
                        <div>
                            {CreateData(item.createdata)}
                        </div>
                    )
                } : {
                    name: <SubProjectname name={item.name}/>,
                    subprojectenter: (
                        <div>
                            <SubProjectEnter id={item.id}/>
                        </div>),
                    createdata: (
                        <div>
                            {CreateData(item.createdata)}
                        </div>
                    )
                }
            )
        })


    };


    //result.source = combineElement(result.source, "ElementName", ["quality", "price"])
}
