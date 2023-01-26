import React, { useState } from "react";
import GoogleMapReact from 'google-map-react';
import { AiFillHome } from "react-icons/ai";
export function StayMap({stay}){
    const {lat, lng} = stay.loc
    console.log(lat, lng)
    const [coordinates, setCoordinates] = useState({ lat, lng})

    const zoom = 11

    const Popper = () => <div className="map-popper"><AiFillHome/><div className="popper-wedge"></div></div>

    const handleClick = ({ lat, lng }) => {
        setCoordinates({ lat, lng })
    }

    return (
        // Important! Always set the container height explicitly
        <div style={{ height: '480px', width: '100%'}}>
            <GoogleMapReact
                onClick={handleClick}
                yesIWantToUseGoogleMapApiInternals
                bootstrapURLKeys={{ key: "AIzaSyBiiIc69TQVyevWG707rsniMhcnFEgSok8" }}
                defaultCenter={coordinates}
                defaultZoom={zoom}
            >
                <Popper  lat={lat} lng={lng} onClick={()=>{}}/>
            </GoogleMapReact>
        </div>
    );
}
