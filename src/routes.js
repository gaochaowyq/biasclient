import PriceCal from "layouts/pricecal";
import SignUp from "layouts/authentication/sign-up";
import {Error} from "layouts/error"
import ForgeMainView from "./layouts/forgemainview";
import CreateProject from "./layouts/projectlist/createproject/CreateProject";
import CreateSubProject from "./layouts/subprojectlist/createsubproject/CreateSubProject";
import CreateBuilding from "./layouts/buildinglist/createbuilding/CreateBuilding";
// @mui icons
import Icon from "@mui/material/Icon";
import CarRepairIcon from '@mui/icons-material/CarRepair';
import ReorderIcon from '@mui/icons-material/Reorder';
import Projecttimeline from "./layouts/projecttimeline";
import ProjectsList from "./layouts/projectlist";
import Subprojectlist from "./layouts/subprojectlist";
import Buildinglist from "./layouts/buildinglist";
import ProjectCommentsTable from "./layouts/projectcomment";
import ForgeIotView from "./layouts/forgemainview/iotviewer";
import BimStorageCreate from "./layouts/bimstoragemanagement";
import ProjectDashboard from "./layouts/projectdashboard/index"
import Constructmanagement from "./layouts/constructmanagement";
import SignIn from "./layouts/authentication/sign-in";
import UploadRevitToForge from "./layouts/uploadrevittoforge/UploadRevitToForge";
import AllProcessManagement from "./layouts/AllProcessManagement";
import PDFReader from "./layouts/AllProcessManagement/components/PDFReader";
import Batchatgpt from "./layouts/batchatgpt";
import Taskmanager from "./layouts/taskmanager";
import ProjecttimelineByDB from "./layouts/projecttimeline/index_bydb";

const routes = [
    {
        type: "page",
        name: "项目管理",
        key: "projectmanagement",
        icon: <CarRepairIcon fontSize="small">P</CarRepairIcon>,
        route: "/projectlist",
        collapse: [
            {
                type: "page",
                name: "项目管理",
                key: "projectlist",
                route: "/projectlist",
                component: <ProjectsList/>,
                auth: true,

            },
            {
                type: "page",
                name: "创建项目",
                key: "createproject",
                route: "/createproject",
                component: <CreateProject/>,
                auth: true,

            },
            {
                type: "page",
                name: "子项目列表",
                key: "subprojectlist",
                icon: <ReorderIcon fontSize="small">P</ReorderIcon>,
                route: "/subprojectlist/:id",
                component: <Subprojectlist/>,
                auth: true,

            },
            {
                type: "page",
                name: "创建子项目",
                key: "createsubproject",
                route: "/createsubproject/:id",
                component: <CreateSubProject/>,
                auth: true,

            },
            {
                type: "page",
                name: "分项工程列表",
                key: "buildinglist",
                icon: <ReorderIcon fontSize="small">P</ReorderIcon>,
                route: "/buildinglist/:id",
                component: <Buildinglist/>,
                auth: true,

            },
            {
                type: "page",
                name: "创建分项工程",
                key: "createbuilding",
                icon: <ReorderIcon fontSize="small">P</ReorderIcon>,
                route: "/createbuilding/:id",
                component: <CreateBuilding/>,
                auth: true,

            },
            {
                type: "page",
                name: "上传项目",
                key: "uploadrevittoforge",
                icon: <ReorderIcon fontSize="small">P</ReorderIcon>,
                route: "/uploadrevittoforge/:id",
                component: <UploadRevitToForge/>,
                auth: true,

            },
            {
                type: "page",
                name: "单体视图",
                key: "forgeviewer",
                icon: <Icon fontSize="small">L</Icon>,
                route: "/forgemainview/:id",
                component: <ForgeMainView/>,
                auth: true,

            },
            {
                type: "page",
                name: "造价分析",
                key: "pricecal",
                icon: <Icon fontSize="small">P</Icon>,
                route: "/pricecal/:id",
                component: <PriceCal/>,
                auth: true,

            },
            {
                type: "page",
                name: "监测数据",
                key: "iot",
                icon: <Icon fontSize="small">I</Icon>,
                route: "/iot/:id",
                component: <Error/>,

            },
            {
                type: "page",
                name: "时间计划",
                key: "projecttimeline",
                icon: <Icon fontSize="small">PL</Icon>,
                route: "/projecttimeline/:id",
                component: <Projecttimeline/>,
                auth: true,

            },
            {
                type: "page",
                name: "时间计划FromDB",
                key: "projecttimelinedb",
                icon: <Icon fontSize="small">PLDB</Icon>,
                route: "/projecttimelinedb/:projectid",
                component: <ProjecttimelineByDB/>,
                auth: false,

            },
            {
                type: "page",
                name: "项目批注",
                key: "projectcomments",
                icon: <Icon fontSize="small">PC</Icon>,
                route: "/projectcomments/:id",
                component: <ProjectCommentsTable/>,
                auth: true,

            },
            {
                type: "page",
                name: "物联网",
                key: "iotview",
                icon: <Icon fontSize="small">IOT</Icon>,
                route: "/iotview/:id",
                component: <ForgeIotView/>,
                auth: true,

            },
            {
                type: "page",
                name: "ConstructManagement",
                key: "constructmanagement",
                icon: <Icon fontSize="small">C</Icon>,
                route: "/constructmanagement/:id",
                component: <Constructmanagement/>,
                auth: true,

            },
            {
                type: "page",
                name: "任务管理",
                key: "taskmanager",
                icon: <Icon fontSize="small">L</Icon>,
                route: "/taskmanager/:projectid",
                component: <Taskmanager/>,
                auth: false,

            }
        ]

    },
    {
        type: "page",
        name: "auth",
        key: "signin",
        auth: false,
        icon: <Icon fontSize="small">SignIn</Icon>,
        route: "/authentication/sign-in",
        component: <SignIn/>,
    },
    {
        type: "page",
        name: "注册用户",
        key: "register",
        auth: false,
        icon: <Icon fontSize="small">SignUp</Icon>,
        route: "/authentication/sign-up",
        component: <SignUp/>,

    },
    {
        type: "notlist",
        name: "错误",
        key: "error",
        icon: <Icon fontSize="small">E</Icon>,
        route: "/error",
        component: <Error/>,
        auth: false,

    },
    {
        type: "notlist",
        name: "创建项目",
        key: "bimstoragecreate",
        icon: <Icon fontSize="small">BC</Icon>,
        route: "/bimstorage/create",
        component: <BimStorageCreate/>,
        auth: true,

    },
    {
        type: "collapse",
        name: "项目总汇",
        key: "projectdashboard",
        icon: <Icon fontSize="small">GP</Icon>,
        route: "/",
        component: <ProjectDashboard/>,
        auth: true,

    }
    ,
    {
        type: "page",
        name: "工程概算",
        key: "projectestimate",
        icon: <Icon fontSize="small">GP</Icon>,
        route: "/projectestimate/:id",
        component: <PriceCal/>,
        auth: true,

    },
    {
        type: "page",
        name: "总师管理",
        key: "allprocessmanagement",
        icon: <Icon fontSize="small">GP</Icon>,
        route: "/allprocessmanagement/:id",
        component: <AllProcessManagement/>,
        auth: true,

    },
    {
        type: "page",
        name: "PDFReader",
        key: "pdfreader",
        icon: <Icon fontSize="small">GP</Icon>,
        route: "/pdfreader/:bucketkey/:objectname",
        component: <PDFReader/>,
        auth: false,

    }
    ,
    {
        type: "page",
        name: "云梯",
        key: "batchatgpt",
        icon: <Icon fontSize="small">GP</Icon>,
        route: "/batchatgpt",
        component: <Batchatgpt/>,
        auth: true,

    }

];
export default routes;
