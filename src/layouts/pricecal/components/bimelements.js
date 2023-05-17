import fetchPrice from "../../../util/bimmanagementAPI/fetchPrice";
import fetchMetaData from "../../../util/forgeAPI/fetchMetaData";
import {fetchBuildingElmentsByCoder} from "../../../util/forgeAPI/fetchBuildingElements";
import parasePriceCoder from "../../../util/forgeAPI/parasePriceCoder";
import {combineElement} from "../../../util/helper";

async function fecthBimElements(token, urn, coder ="14-10.20.18") {
    const _metadata = await fetchMetaData(token, urn)
    const metadata = _metadata.data.metadata.find((_e) => _e.role === "3d")
    const buildingdata = await fetchBuildingElmentsByCoder(token, urn, metadata.guid, coder, 0)

    const columns = [
        {field: 'id', headerName: 'ID', width: 90},
        {
            field: 'elementName',
            headerName: '构件名称',
            width: 150,
            editable: false,
        },
        {
            field: 'quqlity',
            headerName: '量',
            width: 150,
            editable: false,
        },
        {
            field: 'unit',
            headerName: '单位',
            type: 'number',
            width: 110,
            editable: false,
        }
    ];
    console.log(buildingdata)
    const rows = buildingdata.map((item, index) => {
        let qu=0
        try {
            qu = item.properties["尺寸标注"]["体积"];

        }
        catch (e){}

        return {id: index, elementName: item.name, quqlity: qu, unit: qu}
    })


    return {columns: columns, rows: rows};


    //result.source = combineElement(result.source, "ElementName", ["quality", "price"])
}

export {fecthBimElements}
