import * as React from 'react';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import {fetchCoder} from "../../util/bimmanagementAPI/CategoryCoder/fetchCoder";
import {useContext, useEffect, useState} from "react";
import {authContext} from "../../context/AuthContext";
import useForgeToken from "../../util/forgeAPI/useForgeToken";


const CategoryCoder = ({codernumber, CallBack}) => {
    const {token, admin} = useContext(authContext);
    const forgeToken = useForgeToken();
    const [coders, SetCoders] = useState([
        {
            "index": 1,
            "coder": "14-10",
            "name": "建筑",
            "parent": null
        },
        {
            "index": 2,
            "coder": "14-10.10",
            "name": "场地",
            "parent": 1
        },
        {
            "index": 3,
            "coder": "14-10.20",
            "name": "建筑构件",
            "parent": 1
        },
        {
            "index": 4,
            "coder": "14-10.20.03",
            "name": "建筑墙",
            "parent": 3
        },
        {
            "index": 5,
            "coder": "14-10.20.03.03",
            "name": "内墙",
            "parent": 4
        },
        {
            "index": 6,
            "coder": "14-10.20.03.03.03",
            "name": "隔墙",
            "parent": 5
        },
        {
            "index": 7,
            "coder": "14-10.20.03.06",
            "name": "外墙",
            "parent": 4
        },
        {
            "index": 8,
            "coder": "14-10.20.03.06.03",
            "name": "保温涂料外墙",
            "parent": 5
        },
        {
            "index": 7,
            "coder": "14-10.20.03.06.06",
            "name": "涂料墙面",
            "parent": 5
        },
        {
            "index": 9,
            "coder": "14-10.20.03.06.09",
            "name": "石材墙面",
            "parent": 5
        },
        {
            "index": 10,
            "coder": "14-10.20.03.09",
            "name": "特殊墙体",
            "parent": 4
        },
        {
            "index": 11,
            "coder": "14-10.20.06",
            "name": "建筑柱",
            "parent": 3
        },
        {
            "index": 12,
            "coder": "14-10.20.09",
            "name": "门",
            "parent": 3
        },
        {
            "coder": "14-10.20.09.03",
            "name": "室内门",
            "parent": 4
        },
        {
            "index": 13,
            "coder": "14-10.20.09.03.03",
            "name": "普通门",
            "parent": 5
        },
        {
            "index": 14,
            "coder": "14-10.20.09.03.06",
            "name": "消防门",
            "parent": 5
        },
        {
            "index": 15,
            "coder": "14-10.20.09.06",
            "name": "室外门",
            "parent": 4
        },
        {
            "index": 16,
            "coder": "14-10.20.09.06.03",
            "name": "普通门",
            "parent": 5
        },
        {
            "index": 17,
            "coder": "14-10.20.09.06.06",
            "name": "消防门",
            "parent": 5
        },
        {
            "index": 18,
            "coder": "14-10.20.12",
            "name": "窗",
            "parent": 3
        },
        {
            "index": 19,
            "coder": "14-10.20.12.03",
            "name": "内窗",
            "parent": 4
        },
        {
            "index": 20,
            "coder": "14-10.20.12.06",
            "name": "外窗",
            "parent": 4
        },
        {
            "index": 21,
            "coder": "14-10.20.15",
            "name": "屋顶",
            "parent": 4
        },
        {
            "index": 22,
            "coder": "14-10.20.15.03",
            "name": "平屋顶",
            "parent": 4
        },
        {
            "index": 23,
            "coder": "14-10.20.15.03.01",
            "name": "正置式",
            "parent": 5
        }
    ]);
    const createTreeView = (data, parentid) => {
        const roots = data.filter((item => item.parent === parentid));

        return roots.map((item) => {
                return (
                    <TreeItem key={item.coder} nodeId={item.coder} label={item.name}>
                        {createTreeView(data, item.index)}
                    </TreeItem>
                )
            }
        )
    }

    return (
        <>

            {
                coders && <TreeView
                    aria-label="file system navigator"
                    defaultCollapseIcon={<ExpandMoreIcon/>}
                    defaultExpandIcon={<ChevronRightIcon/>}
                    onNodeFocus={CallBack}
                    sx={{height: "100%", flexGrow: 1, maxWidth: 200, overflowY: 'auto'}}
                >
                    {
                        createTreeView(coders, null)
                    }
                </TreeView>
            }
        </>
    );
}

export default CategoryCoder