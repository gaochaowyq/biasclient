/**
 */
import {useEffect, useState, useRef} from "react";
import {useParams} from 'react-router-dom';
import {styled} from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import {useMaterialUIController, setMiniSidenav} from "context";
import useForgeToken from "util/forgeAPI/useForgeToken";
import Footer from "examples/Footer";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import useToken from "../authentication/sign-in/components/useToken";
import {fetchBuilding} from "util/bimmanagementAPI/fetchBuildings";
import BaseViewer from "./BaseViewer";
import CustomProperityPanel from "./extensions/getProjectComment";
import addProjectCommentExtension from "./extensions/addProjectComment";
import DisplayByCoder from "./extensions/DisplayByCoder";
import viewerManagement from "./extensions/viewerManagement";

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function ForgeMainView() {
    const [viewername, setViewer] = useState("{3D}");
    const {token, setToken} = useToken();
    const forgeToken = useForgeToken();
    const [projectid, setProjectId] = useState("");
    const [models, setModels] = useState([{name:"",urn:""}]);
    const [controller, dispatch] = useMaterialUIController();
    const {id} = useParams();
    useEffect(() => {
        fetchBuilding(token,id).then(res => {
            setModels(
                [
                    {name:`${res.info.objectKey}`,urn:`urn:${res.info.uri_forge}`},
                    {name:`${res.subproject.project.info.objectKey}`,urn:`urn:${res.subproject.project.info.uri_forge}`}
                ]
            );
            setProjectId(res.subproject.project.id)})
        setMiniSidenav(dispatch, true);
    }, []);

    return (
        <DashboardLayout>
            <BaseViewer
                models={models}
                token={forgeToken}
                oextension={[]}
                extensions={[CustomProperityPanel,addProjectCommentExtension,DisplayByCoder,viewerManagement]}
                buildingid={id}
                projectid={projectid}
            />
            <Footer/>
        </DashboardLayout>

    );
}

export default ForgeMainView;
