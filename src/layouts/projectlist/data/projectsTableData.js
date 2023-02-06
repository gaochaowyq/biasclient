import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

// Images
export default function projectsTableData(projects) {

    const Projectname = ({name}) => (
        <Box display="flex" alignItems="center" lineHeight={1}>
            {name}
        </Box>
    );
    const ProjectEnter = ({id}) => {
        const navigate = useNavigate();
        const navigateToSubProject = () => {
            navigate(`/subprojectlist/${id}`);
        };
        return (
            <Button onClick={navigateToSubProject}>
                查看
            </Button>
        )
    }
    const ProjectAdd = () => {
        const projectAdd =()=>{}
        return (
            <Button onClick={projectAdd}>
                添加项目
            </Button>
        )
    }
        const Project_Modify = (id) => {
        return (
            <List sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
                <ListItem alignItems="flex-start">
                    <ProjectAdd id={id}/>
                </ListItem>
                <ListItem alignItems="flex-start">
                    <ProjectModify id={id}/>
                </ListItem>
                <ListItem alignItems="flex-start">
                    <ProjectDelete id={id}/>
                </ListItem>
            </List>
        )
    }
    const ProjectModify = (id) => {
        const ProjectModify = () => {
        };
        return (
            <Button onClick={ProjectModify}>
                修改项目
            </Button>
        )
    }
    const ProjectDelete = (id) => {
        const ProjectDelete = () => {

        };
        return (
            <Button onClick={ProjectDelete}>
                删除项目
            </Button>
        )
    }
    const CreateData = (date) => {
        const _data=new Date(date);
        return (
            `${_data.getFullYear()}年:${_data.getMonth()}月:${_data.getDay()}日`
        )
    }

    return {
        columns: [
            {Header: "项目名称", accessor: "name", width: "30%", align: "left"},
            {Header: "项目类型", accessor: "type", align: "left"},
            {Header: "项目阶段", accessor: "status", align: "center"},
            {Header: "进入项目", accessor: "projectenter", align: "center"},
            {Header: "项目修改", accessor: "projectmodify", align: "center"},
            {Header: "时间", accessor: "createdata", align: "center"}
        ],

        rows: projects.map(item => {
            return {
                name: <Projectname name={item.name}/>,
                type: (
                    <div>
                        {item.info.type}
                    </div>),
                status: (
                    <div>
                        {item.info.status}
                    </div>),
                projectenter: (
                    <div>
                        <ProjectEnter id={item.id}/>
                    </div>),
                projectmodify: (
                    <div>
                        <Project_Modify id={item.id}/>
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
