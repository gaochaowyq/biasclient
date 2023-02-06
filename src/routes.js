

import PriceCal from "layouts/pricecal";
import SignUp from "layouts/authentication/sign-up";
import {Error} from "layouts/error"
import ForgeMainView from "./layouts/forgemainview";
import ProjectTables from "./layouts/tables"
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


const routes = [
    {
        type: "collapse",
        name: "项目列表",
        key: "projectlist",
        icon: <CarRepairIcon fontSize="small">P</CarRepairIcon>,
        route: "/projectlist",
        component: <ProjectsList/>,
    },
    {
        type: "nolist",
        name: "子项目列表",
        key: "subprojectlist",
        icon: <ReorderIcon fontSize="small">P</ReorderIcon>,
        route: "/subprojectlist/:id",
        component: <Subprojectlist/>,
    },
    {
        type: "nolist",
        name: "分项工程列表",
        key: "buildinglist",
        icon: <ReorderIcon fontSize="small">P</ReorderIcon>,
        route: "/buildinglist/:id",
        component: <Buildinglist/>,
    },
   {
        type: "collapse",
        name: "项目总表",
        key: "projecttable",
        icon: <Icon fontSize="small">L</Icon>,
        route: "/projecttable",
        component: <ProjectTables/>,
    },
    {
        type: "nolist",
        name: "单体视图",
        key: "forgeviewer",
        icon: <Icon fontSize="small">L</Icon>,
        route: "/forgemainview/:id",
        component: <ForgeMainView/>,
    },
    {
        type: "notlist",
        name: "造价分析",
        key: "pricecal",
        icon: <Icon fontSize="small">P</Icon>,
        route: "/pricecal/:id",
        component: <PriceCal/>,
    },
    {
        type: "notlist",
        name: "监测数据",
        key: "iot",
        icon: <Icon fontSize="small">I</Icon>,
        route: "/iot/:id",
        component: <Error/>,
    },
    {
        type: "notlist",
        name: "时间计划",
        key: "projecttimeline",
        icon: <Icon fontSize="small">PL</Icon>,
        route: "/projecttimeline/:id",
        component: <Projecttimeline/>,
    },
    {
        type: "notlist",
        name: "项目批注",
        key: "projectcomments",
        icon: <Icon fontSize="small">PC</Icon>,
        route: "/projectcomments/:id",
        component: <ProjectCommentsTable/>,
    },
    {
        type: "notlist",
        name: "物联网",
        key: "iotview",
        icon: <Icon fontSize="small">IOT</Icon>,
        route: "/iotview/:id",
        component: <ForgeIotView/>
    },
    {
        type: "notlist",
        name: "注册用户",
        key: "register",
        auth:false,
        icon: <Icon fontSize="small">SignUp</Icon>,
        route: "/authentication/sign-up",
        component: <SignUp/>
    },
    {
        type: "notlist",
        name: "错误",
        key: "error",
        icon: <Icon fontSize="small">E</Icon>,
        route: "/error",
        component: <Error/>
    },
    {
        type: "collapse",
        name: "创建项目",
        key: "bimstoragecreate",
        icon: <Icon fontSize="small">BC</Icon>,
        route: "/bimstorage/create",
        component: <BimStorageCreate/>
    },
    {
        type: "collapse",
        name: "DashBard",
        key: "dashboard",
        icon: <Icon fontSize="small">D</Icon>,
        route: "/bimstorage/dashboard",
        component: <ProjectDashboard/>
    }
    ,
    {
        type: "collapse",
        name: "ConstructManagement",
        key: "constructmanagement",
        icon: <Icon fontSize="small">C</Icon>,
        route: "/constructmanagement/:id",
        component: <Constructmanagement/>
    }
];

export default routes;
