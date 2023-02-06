// To import the Viewer component
import {Viewer} from "forge-dataviz-iot-react-components";
import {ChronosTimeSlider} from "forge-dataviz-iot-react-components";
import getAuth from "../util/forgeAPI/getAuth";

const env='AutodeskProduction'
const api=''
const docUrn="urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6Zm9ydHJhbnMvQkFUXyVFOCVBNSVCRiVFNiU5NiVCOSVFNyVCRSU4RSVFNiU5QyVBRiVFOSVBNiU4Nl9kZXRhY2hlZC5ydnQ"
const getToken=token
const startTime=0
const endTime=1000

async function onModelLoaded() {
        // Load 'Autodesk.DataVisualization' and store it as a variable for later use

        const dataVizExtn = await oViewer.loadExtension("Autodesk.DataVisualization");

        const DataVizCore = Autodesk.DataVisualization.Core;
        const viewableType = DataVizCore.ViewableType.SPRITE;
        const spriteColor = new THREE.Color(0xffffff);
        const baseURL = "https://shrikedoc.github.io/data-visualization-doc/_static/";
        const spriteIconUrl = `${baseURL}fan-00.svg`;

        const style = new DataVizCore.ViewableStyle(
            viewableType,
            spriteColor,
            spriteIconUrl
        );

        const viewableData = new DataVizCore.ViewableData();
        viewableData.spriteSize = 24; // Sprites as points of size 24 x 24 pixels

        const myDataList = [
            //{ position: { x: 10, y: 2, z: 3 } },
            //{ position: { x: 20, y: 22, z: 3 } },
        ];

        myDataList.forEach((myData, index) => {
            const dbId = 10 + index;
            const position = myData.position;
            const viewable = new DataVizCore.SpriteViewable(position, style, dbId);

            viewableData.addViewable(viewable);
        });

        await viewableData.finish();
        dataVizExtn.addViewables(viewableData);
        /*
        function startCameraTransition() {
            viewer.hide(20524); // Hide Roof Panels
            viewer.autocam.shotParams.destinationPercent = 3; // slow down camera movement
            viewer.autocam.shotParams.duration = 10;
            // move camera to hero view
            viewer.setViewFromArray([
                1.5082,
                -30.912,
                88.6316,
                -13.5,
                -1.87081,
                21.0,
                0,
                0,
                1,
                1.865,
                1.22,
                1,
                0,
            ]);
        }
        startCameraTransition(oViewer);
        */

        }

function SampleApp(props) {


    return (
        <>
            <Viewer
                env={env}
                docUrn={docUrn}
                //onViewerInitialized={onViewerInitialized}
                onModelLoaded={onModelLoaded}
                getToken={async ()=>await getAuth()}
                //geometryIndex={2}
            />
            <ChronosTimeSlider
                startTime={startTime}
                endTime={endTime}
                rangeStart={startRange.toISOString()}
                rangeEnd={endRange.toISOString()}
                onTimeRangeUpdated={onTimeRangeUpdated}
                onCurrTimeUpdated={onCurrTimeUpdated}
            />
        </>
    );
}
export  default SampleApp