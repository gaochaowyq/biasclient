import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import {useNavigate} from 'react-router-dom';

// Images
export default function buildingsTableData(buildings) {

    const Buildingname = ({name}) => (
        <Box display="flex" alignItems="center" lineHeight={1}>
            {name}
        </Box>
    );
    const BuildingEnter = ({id}) => {
        const navigate = useNavigate();
        const navigateToBuilding = () => {
            navigate(`/forgemainview/${id}`);
        };
        return (
            <Button onClick={navigateToBuilding}>
                查看分项工程
            </Button>
        )
    }
    const Building_Modify = ({id}) => {
        return (
            <List sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
                <ListItem alignItems="flex-start">
                    <BuildingAdd id={id}/>
                </ListItem>
                <ListItem alignItems="flex-start">
                    <BuildingModify id={id}/>
                </ListItem>
                <ListItem alignItems="flex-start">
                    <BuildingDelete id={id}/>
                </ListItem>
            </List>
        )
    }

    const BuildingAdd = () => {
        const BuildingAdd = () => {
        }
        return (
            <Button onClick={BuildingAdd}>
                添加分项工程
            </Button>
        )
    }
    const BuildingModify = (id) => {
        const BuildingModify = () => {
        };
        return (
            <Button onClick={BuildingModify}>
                修改分项工程
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
        console.log(date)
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
            return {
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
                        <Building_Modify id={item.id}/>
                    </div>),
                createdata: (
                    <div>
                        {CreateData(item.createdata)}
                    </div>
                )
            }
        })


    };
}
