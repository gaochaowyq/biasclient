import React from 'react';
import {Map, Marker} from 'react-bmapgl';
import {CityListControl} from 'react-bmapgl'
import {useState} from 'react'
import customWhite from "./customWhite.json"


const GeoPicker = (props) => {
    const [marker, SetMarker] = useState()

    return (
        <Map center={props.center} mapType={'earth'} enableRotate={false} enableTilt={false} zoom={props.zoom} style={props.style}
             enableScrollWheelZoom
             mapStyleV2={{styleJson: customWhite}}
             onClick={(e) => {
                 SetMarker(<Marker
                     position={new BMapGL.Point(e.latlng.lng, e.latlng.lat)}
                 />)
                 props.geoPick([e.latlng.lng,e.latlng.lat])
             }}
        >
            {marker}
            <CityListControl/>
        </Map>
    )

}

export default GeoPicker