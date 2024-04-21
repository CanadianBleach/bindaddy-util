// src/components/Map.tsx
import "leaflet/dist/leaflet.css";
import "../css/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer, Tooltip, useMapEvents } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

import { Icon } from "leaflet";
import MarkerIcon2X from "leaflet/dist/images/marker-icon-2x.png";
import MarkerIcon from "leaflet/dist/images/marker-icon.png";
import MarkerShadow from "leaflet/dist/images/marker-shadow.png";

import { useState } from "react";
import Link from "next/link";

Icon.Default.mergeOptions({
    iconRetinaUrl: MarkerIcon2X.src,
    iconUrl: MarkerIcon.src,
    shadowUrl: MarkerShadow.src,
});

export default function MapViewer(props) {
    const { position, zoom, markers } = props;
    console.log(markers);

    let markerElem = (<Marker position={[0, 0]} />);

    try {
        markerElem = markers.map((data, index) => (
            <Marker
                key={data._id}
                position={[data.lat, data.long]}
                eventHandlers={{ click: () => console.log(data._id) }} // also, you can pass your data as a parameter to your clickMarker function
            >
                <Popup>
                    <Link href={`/map?_id=${data._id}`}>
                        <h2 className="">Edit: {data.title}</h2>
                    </Link>
                </Popup>
            </Marker>
        ));
    } catch (e) {
        console.log(e);
    }

    return (
        <>
            <MapContainer className="m-3" center={position} zoom={zoom} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MarkerClusterGroup chunkedLoading>
                    <Marker position={position}>
                        <Popup>
                            Welcome to mooresville!
                        </Popup>
                    </Marker>
                    {markerElem}
                </MarkerClusterGroup>
            </MapContainer>
        </>

    );
}