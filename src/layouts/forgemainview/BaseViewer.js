//import ProblemChat from "./extensions/ProblemChat";
import {useRef, useEffect, useState} from "react";
import MDBox from "../../components/MDBox";
import Grid from "@mui/material/Grid";
import Card from "react-bootstrap/Card";
import {Paper} from "@mui/material";
import MDTypography from "../../components/MDTypography";
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import MultipleModelUtil from './extensions/MultipleModelUtil'
import './style.css'


const BaseViewer = (props) => {
    const forgeViewerRef = useRef()
    const selectionViewRef = useRef()
    const [sheetNodes, setSheetNodes] = useState([])
    const [_viewer, setOViewer] = useState()
    const [_viewerDocument, setViewerDocument] = useState()
    useEffect(() => {
        if (props.models && props.token) {
            initforge()
        }
    }, [props.models]);

    function initforge() {
        var options = {
            env: 'AutodeskProduction',
            api: 'derivativeV2',  // for models uploaded to EMEA change this option to 'derivativeV2_EU'
            language: "zh-Hans",
            getAccessToken: function (onTokenReady) {
                var token = props.token;
                var timeInSeconds = 3600; // Use value provided by Forge Authentication (OAuth) API
                onTokenReady(token, timeInSeconds);
            }
        };
        let extensions = props.extensions
        let oViewer = null;
        let htmlDiv = forgeViewerRef.current
        let config3d = {extensions: props.oextension,}
        oViewer = new Autodesk.Viewing.GuiViewer3D(htmlDiv, config3d);
        oViewer.addEventListener(Autodesk.Viewing.VIEWER_INITIALIZED, function (e) {
            var spinnerContainer = oViewer._loadingSpinner.domElement;
            while (spinnerContainer.hasChildNodes()) {
                spinnerContainer.removeChild(spinnerContainer.lastChild);
            }
            let newspinner = document.createElement('div')
            newspinner.className = 'lds-roller'
            newspinner.appendChild(document.createElement('div'))
            newspinner.appendChild(document.createElement('div'))
            newspinner.appendChild(document.createElement('div'))
            newspinner.appendChild(document.createElement('div'))
            newspinner.appendChild(document.createElement('div'))
            newspinner.appendChild(document.createElement('div'))
            newspinner.appendChild(document.createElement('div'))
            newspinner.appendChild(document.createElement('div'))
            spinnerContainer.appendChild(newspinner)
        })
        oViewer.hideLines(true)
        setOViewer(oViewer)
        oViewer.loadExtension('Autodesk.Viewing.Popout')
        if (props.onModelLoaded) {
            oViewer.addEventListener(Autodesk.Viewing.GEOMETRY_LOADED_EVENT, props.onModelLoaded)
            console.log("there are no ")
        } else {
            console.log("there are")
        }
        Autodesk.Viewing.Initializer(options, function () {
            var startedCode = oViewer.start();
            if (startedCode > 0) {
                console.error('Failed to create a Viewer: WebGL not supported.');
                return;
            }
            if (extensions) {
                extensions.forEach(function (extension) {
                    Autodesk.Viewing.theExtensionManager.registerExtension(extension.extensionName, extension);
                    oViewer.loadExtension(extension.extensionName, {
                        "id": props.buildingid,
                        "projectid": props.projectid
                    });
                });
            }

            const util = new MultipleModelUtil(oViewer);
            const models = props.models;
            util.options = {
                alignment: MultipleModelAlignmentType.ShareCoordinates
            };
            console.log("get models")
            //console.log(models)
            //console.log(props.token)
            util.processModels(models).then(
                res=>{
                    //console.log(res)
                    let viewerDocument=res[0].model.getDocumentNode().getDocument()
                    let defaultModelRoot=viewerDocument.getRoot()
                    let sheet_node = defaultModelRoot.search(Autodesk.Viewing.BubbleNode.SHEET_NODE);
                    setViewerDocument(viewerDocument)
                    setSheetNodes(sheet_node)
                }
            )

/*
            models.forEach((model) => {

                Autodesk.Viewing.Document.load(model.urn, onDocumentLoadSuccess, onDocumentLoadFailure);

            })
*/
            function onDocumentLoadSuccess(viewerDocument) {
                // viewerDocument is an instance of Autodesk.Viewing.Document
                setViewerDocument(viewerDocument)
                let defaultModelRoot=viewerDocument.getRoot()
                //console.log(viewerDocument.getRoot().get3DModelNodes())

                let defaultModel = defaultModelRoot.getDefaultGeometry();

                let sheet_node = defaultModelRoot.search(Autodesk.Viewing.BubbleNode.SHEET_NODE);
                setSheetNodes(sheet_node)
                oViewer.loadDocumentNode(viewerDocument, defaultModel);
            }

            function onDocumentLoadFailure() {
                console.error('Failed fetching Forge manifest Fail Load Model');
            }


        })


        //oViewer.addEventListener(Autodesk.Viewing.GEOMETRY_LOADED_EVENT, onModelLoaded);

    }


    return (
        <MDBox pt={6} pb={3}>
            <Grid container spacing={6}>
                <Grid item xs={10}>
                    <Card>
                        <MDBox
                            mx={2}
                            mt={-3}
                            py={3}
                            px={2}
                            variant="gradient"
                            bgColor="info"
                            borderRadius="lg"
                            coloredShadow="info"
                        >
                            <MDTypography variant="h6" color="white">
                                建筑信息模型视窗
                            </MDTypography>
                        </MDBox>
                        <MDBox borderRadius="lg"
                               coloredShadow="info"
                        >
                            <div className={"ForegeViewer"} ref={forgeViewerRef}
                                 style={{position: "relative", height: "90vh", width: "auto"}}>
                            </div>

                        </MDBox>

                    </Card>
                </Grid>
                <Grid item xs={2}>
                    <Card>
                        <MDBox
                            mx={2}
                            mt={-3}
                            py={3}
                            px={2}
                            variant="gradient"
                            bgColor="info"
                            borderRadius="lg"
                            coloredShadow="info"
                        >
                            <MDTypography variant="h6" color="white">
                                平面图纸
                            </MDTypography>
                        </MDBox>
                        <MDBox borderRadius="lg"
                               coloredShadow="info"
                               height={"90vh"}
                        >
                            <Paper>
                                <TreeView
                                    aria-label="plan drawing navigator"
                                    defaultCollapseIcon={<ExpandMoreIcon/>}
                                    defaultExpandIcon={<ChevronRightIcon/>}
                                    sx={{ flexGrow: 1, overflowY: 'auto'}}
                                >
                                    <TreeItem nodeId="A1" label="建筑专业">
                                        {sheetNodes.filter((element) => {
                                            return element.data.name.startsWith("建") || element.data.name.startsWith("PM")
                                        }).map((sheet, index) => {
                                            return (<TreeItem sx={{
                                                '& .MuiTreeItem-label': {
                                                    "font-size": '14px',
                                                },
                                            }} key={`Node${index}`} nodeId={`Node${index}`}
                                                              label={sheet.data.name} onClick={
                                                (e) => {
                                                    e.stopPropagation()
                                                    _viewer.tearDown();
                                                    //_viewer.setUp(options);
                                                    _viewer.loadDocumentNode(_viewerDocument, sheet);
                                                }

                                            }/>)
                                        })}

                                    </TreeItem>
                                    <TreeItem nodeId="S1" label="结构专业">
                                        {sheetNodes.filter((element) => {
                                            return element.data.name.startsWith("结")
                                        }).map((sheet, index) => {
                                            return (<TreeItem key={`Node${index}`} nodeId={`Node${index}`}
                                                              label={sheet.data.name} onClick={
                                                (e) => {
                                                    e.stopPropagation()
                                                    _viewer.tearDown();
                                                    //_viewer.setUp(options);
                                                    _viewer.loadDocumentNode(_viewerDocument, sheet);
                                                }

                                            }/>)
                                        })}

                                    </TreeItem>
                                    <TreeItem nodeId="W1" label="给排水专业">
                                        {sheetNodes.filter((element) => {
                                            return element.data.name.startsWith("水")
                                        }).map((sheet, index) => {
                                            return (<TreeItem key={`Node${index}`} nodeId={`Node${index}`}
                                                              label={sheet.data.name} onClick={
                                                (e) => {
                                                    e.stopPropagation()
                                                    _viewer.tearDown();
                                                    //_viewer.setUp(options);
                                                    _viewer.loadDocumentNode(_viewerDocument, sheet);
                                                }

                                            }/>)
                                        })}

                                    </TreeItem>
                                    <TreeItem nodeId="M1" label="暖通专业">
                                        {sheetNodes.filter((element) => {
                                            return element.data.name.startsWith("暖")
                                        }).map((sheet, index) => {
                                            return (<TreeItem key={`MNode${index}`} nodeId={`Node${index}`}
                                                              label={sheet.data.name} onClick={
                                                (e) => {
                                                    e.stopPropagation()
                                                    _viewer.tearDown();
                                                    //_viewer.setUp(options);
                                                    _viewer.loadDocumentNode(_viewerDocument, sheet);
                                                }

                                            }/>)
                                        })}

                                    </TreeItem>
                                    <TreeItem nodeId="E1" label="电气专业">
                                        {sheetNodes.filter((element) => {
                                            return element.data.name.startsWith("电")
                                        }).map((sheet, index) => {
                                            return (<TreeItem key={`ENode${index}`} nodeId={`Node${index}`}
                                                              label={sheet.data.name} onClick={
                                                (e) => {
                                                    e.stopPropagation()
                                                    _viewer.tearDown();
                                                    //_viewer.setUp(options);
                                                    _viewer.loadDocumentNode(_viewerDocument, sheet);
                                                }

                                            }/>)
                                        })}

                                    </TreeItem>
                                    <TreeItem nodeId="Q1" label="其他">
                                        {sheetNodes.filter((element) => {
                                            return element.data.name.startsWith("其")
                                        }).map((sheet, index) => {
                                            return (<TreeItem key={`QNode${index}`} nodeId={`Node${index}`}
                                                              label={sheet.data.name} onClick={
                                                (e) => {
                                                    e.stopPropagation()
                                                    _viewer.tearDown();
                                                    //_viewer.setUp(options);
                                                    _viewer.loadDocumentNode(_viewerDocument, sheet);
                                                }

                                            }/>)
                                        })}

                                    </TreeItem>
                                </TreeView>
                            </Paper>


                        </MDBox>

                    </Card>
                </Grid>
            </Grid>
        </MDBox>


    )
        ;

}

export default BaseViewer