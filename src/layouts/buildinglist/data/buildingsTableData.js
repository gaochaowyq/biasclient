import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import {useNavigate} from 'react-router-dom';
import {useContext, useState} from "react";
import {authContext} from "context/AuthContext";
import useForgeToken from "util/forgeAPI/useForgeToken"
import {fetchMainfest} from "../../../util/forgeAPI/fetchMainfest";

// Images
export default function buildingsTableData(buildings) {
    const {admin} = useContext(authContext)
    const [ishovered, setIsHovered] = useState(false);
    const isadmin = admin.admin;
    const forgetoken = useForgeToken();
    const navigate = useNavigate();


    const Buildingname = ({name}) => (
        <Box display="flex" alignItems="center" lineHeight={1}>
            {name}
        </Box>
    );
    const BuildingEnter = ({id, isactive}) => {
        const navigateToBuilding = () => {
            const build = buildings.find((item) => {
                if (item.id === id) return item
            })
            const uri = build.info.uri_forge
            fetchMainfest(forgetoken, uri).then(
                res => {
                    if (res.status==='success'){
                        navigate(`/forgemainview/${id}`);

                    }
                    else
                    {
                        alert(`文件正在转换中，${res.progress}请稍等`)
                    }
                }
            )



        };
        return (
            <Button disabled={isactive} onClick={navigateToBuilding}>
                查看分项工程
            </Button>
        )
    }
    const Building_Modify = ({id}) => {
        return (
            <List sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
                <ListItem alignItems="flex-start">
                    <BuildingModify id={id}/>
                </ListItem>
                <ListItem alignItems="flex-start">
                    <BuildingDelete id={id}/>
                </ListItem>
            </List>
        )
    }

    const BuildingModify = ({id}) => {
        return (
            <Button onClick={() => {
                navigate(`/uploadrevittoforge/${id}`)
            }}>
                上传项目
            </Button>
        )
    }
    const BuildingDelete = (id) => {
        const BuildingDelete = () => {

        };
        return (
            <Button onClick={BuildingDelete}>
                删除分项工程
            </Button>
        )
    }
    const CreateData = (date) => {
        const _data = new Date(date);
        return (
            `${_data.getFullYear()}年:${_data.getMonth()}月:${_data.getDay()}日`
        )
    }

    return {
        columns: [
            {Header: "分项工程名称", accessor: "name", width: "30%", align: "left"},
            {Header: "分项工程类型", accessor: "type", align: "left"},
            {Header: "进入分项工程", accessor: "buildingenter", align: "center"},
            {Header: "修改分项工程", accessor: "buildingmodify", align: "center"},
            {Header: "创建时间", accessor: "createdata", align: "center"}
        ],

        rows: buildings.map(item => {
            return (isadmin ? {
                    name: <Buildingname name={item.name}/>,
                    type: (
                        <div>
                            {item.info.type}
                        </div>
                    ),
                    buildingenter: (
                        <div>
                            <BuildingEnter id={item.id}/>
                        </div>),
                    buildingmodify: (
                        <div>
                            <Building_Modify id={item.id} isactive={item.info.uri_forge}/>
                        </div>),
                    createdata: (
                        <div>
                            {CreateData(item.createdata)}
                        </div>
                    )
                } : {
                    name: <Buildingname name={item.name}/>,
                    type: (
                        <div>
                            {item.info.type}
                        </div>
                    ),
                    buildingenter: (
                        <div>
                            <BuildingEnter id={item.id}/>
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
}
