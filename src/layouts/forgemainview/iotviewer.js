/**

 */
import {useEffect, useState, useRef, useContext} from "react";
import {useParams} from 'react-router-dom';
import {styled} from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import {useMaterialUIController, setMiniSidenav} from "context";
import Footer from "../../examples/Footer";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import getAuth from "../../util/forgeAPI/getAuth";
import {fetchBuilding} from "../../util/bimmanagementAPI/fetchBuildings";

import BaseViewer from "./BaseViewer";
import CustomProperityPanel from "./extensions/getProjectComment";
import addProjectCommentExtension from "./extensions/addProjectComment";
import DisplayByCoder from "./extensions/DisplayByCoder";
import {authContext} from "../../context/AuthContext";


const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function ForgeIotView() {
    const [viewername, setViewer] = useState("{3D}");
    const {token, admin} = useContext(authContext);
    const [controller, dispatch] = useMaterialUIController();
    const [urn, setUrn] = useState("");
    const {id} = useParams();
    const selectionViewRef = useRef();
    useEffect(() => {
        getAuth().then(res => {
            setToken(res);
            console.log(res)
        })
        fetchBuilding(id,token).then(res => setUrn(res.info.uri_forge))
        setMiniSidenav(dispatch, true);
    }, []);
    var sensorStyleDefinitions = {
                co2: {
                    url: "https://d2zqnmauvnpnnm.cloudfront.net/assets-1/images/co2.svg",
                    color: 0xffffff,
                },
                temperature: {
                    url: "https://d2zqnmauvnpnnm.cloudfront.net/assets-1/images/thermometer.svg",
                    color: 0xffffff,
                },
                default: {
                    url: "https://d2zqnmauvnpnnm.cloudfront.net/assets-1/images/circle.svg",
                    color: 0xffffff,
                },
            };
    let devices = [
                {
                    id: "Hall 85",
                    position: {
                        x: 31.945194312366482,
                        y: 101.11616501336187,
                        z: 6.807743072509766,
                    },
                    type: "temperature",
                    sensorTypes: ["temperature"],
                },
                {
                    id: "Hall III 72",
                    position: {
                        x: -98.96997142930644,
                        y: 242.22996463496446,
                        z: 8.035340592265129,
                    },
                    type: "combo",
                    sensorTypes: ["co2", "temperature"],
                },
            ];
    async function onModelLoaded(data) {
        var viewer = data.target;
        const dataVizExt = await viewer.loadExtension("Autodesk.DataVisualization");

        var styleMap = {};
        // Create model-to-style map from style definitions.
        Object.entries(sensorStyleDefinitions).forEach(([type, styleDef]) => {
            styleMap[type] = new Autodesk.DataVisualization.Core.ViewableStyle(
                Autodesk.DataVisualization.Core.ViewableType.SPRITE,
                new THREE.Color(styleDef.color),
                styleDef.url
            );
        });

        const viewableData = new Autodesk.DataVisualization.Core.ViewableData();
        viewableData.spriteSize = 16;
        let startId = 1;

        // Add viewables
        devices.forEach((device) => {
            let style = styleMap[device.type] || styleMap["default"];
            const viewable = new Autodesk.DataVisualization.Core.SpriteViewable(
                device.position,
                style,
                startId
            );
            viewableData.addViewable(viewable);
            startId++;
        });

        await viewableData.finish();
        dataVizExt.addViewables(viewableData);

        // Load level data
        let viewerDocument = data.model.getDocumentNode().getDocument();
        const aecModelData = await viewerDocument.downloadAecModelData();
        let levelsExt;
        if (aecModelData) {
            levelsExt = await viewer.loadExtension("Autodesk.AEC.LevelsExtension", {
                doNotCreateUI: false,
            });
        }

        // Select Level 3.
        const floorData = levelsExt.floorSelector.floorData;
        const floor = floorData[4];
        levelsExt.floorSelector.selectFloor(floor.index, true);

        // Generate surfaceshading data by mapping devices to rooms.
        const structureInfo = new Autodesk.DataVisualization.Core.ModelStructureInfo(
            data.model
        );
        console.log(structureInfo)
        const heatmapData = await structureInfo.generateSurfaceShadingData(devices);

        // Setup surfaceshading
        await dataVizExt.setupSurfaceShading(data.model, heatmapData);

        dataVizExt.registerSurfaceShadingColors("co2", [0x00ff00, 0xff0000]);
        dataVizExt.registerSurfaceShadingColors("temperature", [0xff0000, 0x0000ff]);

        /**
         * Interface for application to decide the current value for the heatmap
         * @param {Object} device device
         * @param {string} sensorType sensor type
         */
        function getSensorValue(device, sensorType) {
            let value = Math.random();
            return value;
        }

        dataVizExt.renderSurfaceShading(floor.name, "temperature", getSensorValue);

        setInterval(() => dataVizExt.updateSurfaceShading(getSensorValue), 2000);

    }




    return (
        <DashboardLayout>
            <DashboardNavbar/>
            <BaseViewer
                urn={urn}
                token={token}
                oextension={["Autodesk.DataVisualization"]}
                extensions={[]}
                buildingid={id}
                onModelLoaded={onModelLoaded}

            />
            <Footer/>
        </DashboardLayout>

    );
}

export default ForgeIotView;
