import fetchObjectTree from "./fetchObjectTree";
import fetchSpecificProperties from "./FetchSpecificProperties";

async function fetchBuildingArea(urn,modelid)
{
    let objecttree=await fetchObjectTree(urn,modelid)
    let roomid=[]
    let rooms=objecttree.data.objects[0].objects.find(element => element.name ==="房间").objects.map(res=>roomid.push(res.objectid))

    const roomsetcount=Math.ceil(rooms.length/900)

    let roomfetchobjects=[]
    for (var i=0; i<roomsetcount;i++)
    {
        roomfetchobjects.push(roomid.slice(i*900,(i+1)*900))
    }
    let query={
      "query": {
        "$in": [
            "objectid"
        ]
      },
      "fields": [
        "objectid",
        "name",
        "properties.尺寸标注.面积",
        "properties.标识数据.*",
        "properties.约束.*"
      ],
      "pagination": {
        "offset": 0,
        "limit": 1000
      },
      "payload": "text"
    }
    let area=[]
    for (const i of roomfetchobjects )
    {
        query.query.$in=["objectid"].concat(i)
        var c=await fetchSpecificProperties(urn,modelid,query)
        c.data.collection.forEach(function (element){
            area.push(element)}
        )
    }
    console.log(area)
    return area



}

export default fetchBuildingArea;