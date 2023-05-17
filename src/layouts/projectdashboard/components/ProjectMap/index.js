/**
 use to display all project in the map
 */

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import {Map, Marker, Label} from "react-bmapgl";
import {whitestyle} from "assets/mapstyle/whitestyle";

function ProjectMap({locations}) {
    return (
        <Card sx={{height: "100%"}}>
            <MDBox pt={3} px={3}>
                <MDTypography variant="h6" fontWeight="medium">
                    项目位置
                </MDTypography>
            </MDBox>
            <MDBox p={2}>
                <Map center={{lng: 116.402544, lat: 39.928216}} zoom="5" mapStyleV2={{styleJson: whitestyle}}>
                    {
                        locations.map((item, index) => {
                            return <div key={index}>
                                <Label key={"label"+index}
                                    position={{lng: item[1], lat: item[0]}}
                                    text={item[2]}
                                />
                                <Marker key={"marker"+index} position={{lng: item[1], lat: item[0]}} icon={`blue`}/>


                            </div>
                        })
                    }


                </Map>
            </MDBox>
        </Card>
    );
}

export default ProjectMap;