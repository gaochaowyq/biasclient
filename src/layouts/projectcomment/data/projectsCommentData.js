/* proejctCommentData */


export default function ProjectsCommentData(comments) {


    return {
        columns: [
            {Header: "geometryId", accessor: "geometryId", width: "30%", align: "left"},
            {Header: "comments", accessor: "comments", align: "center"}
        ],
        rows: comments.map(item => {
            return {
                geometryId:item.geometryId,
                comments:item.comments.map((res)=>{return `${res.name}:${res.problem}`}).join('\n')
            }
        })

    };
}
