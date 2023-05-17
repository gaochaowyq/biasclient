/**
 */
import {useEffect, useState,useContext} from "react";
import {useParams} from 'react-router-dom';
import {styled} from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import useForgeToken from "util/forgeAPI/useForgeToken";
import Footer from "examples/Footer";
import PageLayout from "../../examples/LayoutContainers/PageLayout";
import {fetchBuilding} from "util/bimmanagementAPI/fetchBuildings";
import BaseViewer from "./BaseViewer";
import CustomProperityPanel from "./extensions/getProjectComment";
import addProjectCommentExtension from "./extensions/addProjectComment";
import DisplayByCoder from "./extensions/DisplayByCoder";
import MarkUp3D from "./extensions/markUp3D";
import viewerManagement from "./extensions/viewerManagement";
import {authContext} from "../../context/AuthContext";
import {fetchSubProject} from "../../util/bimmanagementAPI/fetchSubProject";
import {fetchProject} from "../../util/bimmanagementAPI/fetchProject";

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function ForgeMainView() {
    const {token} = useContext(authContext)
    const forgeToken = useForgeToken();
    const [projectid, setProjectId] = useState(false);
    const [models, setModels] = useState([{name: "", urn: ""}]);
    const {id} = useParams();
    useEffect(() => {
        fetchBuilding(token, id).then(res => {
            let _models = []
            _models.push({name: `${res.info.objectKey}`, urn: `urn:${res.info.uri_forge}`})
            fetchSubProject(token, res.subproject).then(sub => {
                console.log(sub)
                fetchProject(sub.project,token).then(project => {
                    console.log("fetch project")
                    setProjectId(project.id)
                    console.log(project)
                        if (project.info && project.info.uri_forge &&project.info.uri_forge!=="") {
                            _models.push({
                                name: `${project.info.objectKey}`,
                                urn: `urn:${project.info.uri_forge}`
                            })
                        }
                    }
                )
            })

            setModels(_models);

        })
    }, []);

    return (
        <PageLayout sx={{height:"10vh"}}>
            {projectid &&
                <BaseViewer
                    models={models}
                    token={forgeToken}
                    oextension={["Autodesk.Viewing.MarkupsCore"]}
                    extensions={[CustomProperityPanel, addProjectCommentExtension, DisplayByCoder, viewerManagement,MarkUp3D]}
                    buildingid={id}
                    projectid={projectid}
                />
            }
            <Footer/>
        </PageLayout>

    );
}

export default ForgeMainView;
