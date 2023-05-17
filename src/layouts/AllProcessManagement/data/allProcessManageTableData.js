import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom';
import {useContext} from "react";
import {authContext} from "context/AuthContext";
// Images
export default function allProcessManageTableData(bucketkey,projects) {
    const {admin} = useContext(authContext)
    const navigate = useNavigate();
    const CreateData = (date) => {
        const _data = new Date(date);
        return (
            `${_data.getFullYear()}年:${_data.getMonth()}月:${_data.getDay()}日`
        )
    }
    const DocumentEnter = ({bucketkey,objectname}) => {

        const navigateToDocument = () => {
            navigate(`/pdfreader/${bucketkey}/${objectname}/`);
        };
        return (
            <Button onClick={navigateToDocument}>
                查看
            </Button>
        )
    }

    return {
        columns: [
            {Header: "文件名称", accessor: "name", width: "30%", align: "left"},
            {Header: "文件类型", accessor: "type", align: "left"},
            {Header: "查看文档", accessor: "enter", align: "left"},
            {Header: "时间", accessor: "createdata", align: "center"}
        ],

        rows: projects.map(item => {
            return (
                    {
                        name: (
                            <div>
                                {item.name}
                            </div>),
                        type: (
                            <div>
                                {item.type}
                            </div>),
                        enter: (
                            <DocumentEnter objectname={item.name} bucketkey={bucketkey} />
                        ),
                        createdata: (
                            <div>
                                {CreateData(item.lastModified)}
                            </div>
                        )
                    }
            )
        })


    };
}
