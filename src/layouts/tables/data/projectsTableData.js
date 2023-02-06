// @mui material components
import Icon from "@mui/material/Icon";


// Material Dashboard 2 React components
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import {useNavigate} from 'react-router-dom';

// Images

export default function data(buildings) {

    const Projectname = ({name}) => (
        <Box display="flex" alignItems="center" lineHeight={1}>
            {name}
        </Box>
    );
    const ProjectNav = ({id}) => {
        const navigate = useNavigate();

        const navigateToProject = () => {
            // 👇️ navigate to /contacts
            navigate(`/forgemainview/${id}`);
        };
        return (
            <Button onClick={navigateToProject}>
                查看
            </Button>
        )
    }
    const PriceNav = ({id}) => {
        const navigate = useNavigate();
        const navigateToPriceCal = () => {
            navigate(`/pricecal/${id}`);
        };
        return (
            <Button onClick={navigateToPriceCal}>
                造价分析
            </Button>
        )
    }
    const ProjectTimelineNav = ({id}) => {
        const navigate = useNavigate();
        const navigateToProjectTimelineNav = () => {
            navigate(`/projecttimeline/${id}`);
        };
        return (
            <Button onClick={navigateToProjectTimelineNav}>
                项目计划
            </Button>
        )
    }
    const ProjectCommentNav = ({id}) => {
        const navigate = useNavigate();
        const ProjectCommentNav = () => {
            navigate(`/projectcomments/${id}`);
        };
        return (
            <Button onClick={ProjectCommentNav}>
                项目批注
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
            {Header: "上传时间", accessor: "uploadtime", align: "center"},
            {Header: "文件名称", accessor: "objectkey", align: "center"},
            {Header: "造价统计", accessor: "pricecal", align: "center"},
            {Header: "进入页面", accessor: "check", align: "center"},
            {Header: "项目计划", accessor: "plan", align: "center"},
            {Header: "项目批注", accessor: "projectcomment", align: "center"},

        ],

        rows: buildings.map(item => {
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
                uploadtime: (
                    <div>
                        { CreateData(item.createdata)}
                    </div>),
                objectkey: (
                    <div>
                        {item.info.objectKey}
                    </div>),
                pricecal: (
                    <PriceNav id={item.id}/>
                ),
                check: (
                    <ProjectNav id={item.id}/>),
                plan: (
                    <ProjectTimelineNav id={item.subproject.project.id}/>
                ),
                projectcomment: (
                    <ProjectCommentNav id={item.subproject.project.id}/>
                )
            }
        })


    };
}
