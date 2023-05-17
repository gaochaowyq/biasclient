import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import {useContext} from "react";
import {authContext} from "context/AuthContext";

// Images
export default function subprojectsTableData(subprojects) {
    const {admin} = useContext(authContext)
    const isadmin = admin.admin;
    const navigate = useNavigate();
    const SubProjectname = ({name}) => (
        <Box display="flex" alignItems="center" lineHeight={1}>
            {name}
        </Box>
    );
    const SubProjectEnter = ({id}) => {
        const navigateToBuilding = () => {
            navigate(`/buildinglist/${id}`);
        };
        return (
            <Button onClick={navigateToBuilding}>
                查看子项工程
            </Button>
        )
    }

    const SubProjectModify = (id) => {
        const ProjectModify = () => {
        };
        return (
            <Button onClick={ProjectModify}>
                修改子项工程
            </Button>
        )
    }
    const SubProjectDelete = (id) => {
        const SubProjectDelete = () => {

        };
        return (
            <Button onClick={SubProjectDelete}>
                删除子项工程
            </Button>
        )
    }
    const SubProject_Modify = (id) => {
        return (
            <List sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
                <ListItem alignItems="flex-start">
                    <SubProjectModify id={id}/>
                </ListItem>
                <ListItem alignItems="flex-start">
                    <SubProjectDelete id={id}/>
                </ListItem>
            </List>
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
}
