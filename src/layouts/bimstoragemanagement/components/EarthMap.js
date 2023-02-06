import React from 'react';
import {Map, Marker, NavigationControl, InfoWindow} from 'react-bmapgl';
import customWhite from "./customWhite.json"


const EarthMap = (props) => {

    return(
        <Map center={props.center} zoom={props.zoom} style={props.style}
             enableScrollWheelZoom
             mapStyleV2={{styleJson: customWhite}}
             onClick={(e)=>{
                 console.log(e)
             }}
        >
            <NavigationControl/>
        </Map>
    )

}

export default EarthMap