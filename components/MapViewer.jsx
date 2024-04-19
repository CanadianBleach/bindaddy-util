// src/components/Map.tsx
import { MapContainer, Marker, Popup, TileLayer, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

import "../css/leaflet.css";
import MarkerClusterGroup from "react-leaflet-cluster";

export default function MapViewer(props) {
    const { position, zoom, markers } = props;
    console.log(markers);
    let markerElem = (<Marker position={[0, 0]} />);

    if (markers) {
        markerElem = markers.map((data, index) => (
            <Marker
                key={index}
                position={[data.lat, data.long]}
                eventHandlers={{ click: () => handleClick(index) }} // also, you can pass your data as a parameter to your clickMarker function
            >
                <Popup>
                    {data.note}
                </Popup>
            </Marker>
        ));
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