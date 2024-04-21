'use client'

import MapSidePanel from "@/components/MapSidePanel";
import Navbar from "@/components/Navbar";
import "bulma/css/bulma.min.css";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";

const fetchMarkers = async () => {
    const response = await fetch('/api/markers');

    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }

    const markers = await response.json();
    return markers;
}

function MapView() {
    const [markers, setMarkers] = useState({
        lat: 0,
        long: 0,
        note: "Loading Markers",
        _id: "0"
    });

    const MapViewer = useMemo(() => dynamic(
        () => import('@/components/MapViewer'),
        {
            loading: () => <p>A map is loading</p>,
            ssr: false
        }
    ), [])

    useEffect(() => {
        (async () => {
            const fetchedMarkers = await fetchMarkers();
            setMarkers(fetchedMarkers.markers);
        })();

        return () => {
            // this now gets called when the component unmounts
        };
    }, []);

    return (
        <>
            <Navbar />
            <div className="is-flex">
                <MapViewer markers={markers} position={[35.5820, -80.8140]} zoom={13} />
                <MapSidePanel />
            </div >
        </>
    )
}

export default MapView;
