/**
 */
import {useEffect, useState, useRef} from "react";
import {useParams} from 'react-router-dom';
import {styled} from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import {useMaterialUIController, setMiniSidenav} from "context";
import useForgeToken from "util/forgeAPI/useForgeToken";
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import useToken from "../authentication/sign-in/components/useToken";
import {fetchBuilding} from "util/bimmanagementAPI/fetchBuildings";
import BaseViewer from 'layouts/forgemainview/BaseViewer'
import timercontrol from "./extension/timercontrol";

function ConstructManagementViewer() {
    const [viewername, setViewer] = useState("{3D}");
    const {token, setToken} = useToken();
    const [controller, dispatch] = useMaterialUIController();
    const [models, setModels] = useState([{name: "", urn: ""}]);
    const forgeToken = useForgeToken();
    const [projectid, setProjectId] = useState("");
    const {id} = useParams();
    useEffect(() => {
        fetchBuilding(token, id).then(res => {
            setModels(
                [
                    {name: `${res.info.objectKey}`, urn: `urn:${res.info.uri_forge}`},
                    {
                        name: `${res.subproject.project.info.objectKey}`,
                        urn: `urn:${res.subproject.project.info.uri_forge}`
                    }
                ]
            );
            setProjectId(res.subproject.project.id)
        })
        setMiniSidenav(dispatch, true);
    }, []);

    return (
        <DashboardLayout>
            <BaseViewer
                models={models}
                token={forgeToken}
                oextension={[]}
                extensions={[timercontrol]}
                buildingid={id}
                projectid={projectid}
            />
            <Footer/>
        </DashboardLayout>

    );
}

export default ConstructManagementViewer;