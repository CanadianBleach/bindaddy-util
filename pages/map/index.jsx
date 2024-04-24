'use client'

import MapSidePanel from "@/components/MapSidePanel";
import Navbar from "@/components/Navbar";
import "bulma/css/bulma.min.css";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";



function MapView() {
    const fetchMarkers = async () => {
        console.log("fetching all markers");
        const response = await fetch('/api/markers');

        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            throw new Error(message);
        }

        const markers = await response.json();
        return markers;
    }
    // Wrapped as an array so that MapViewer can use the map function
    const [markers, setMarkers] = useState([
        {
            "_id": "66257669f077c95b005a4cfe",
            "title": "Default Marker",
            "address": "None",
            "lat": 35.6034,
            "long": -80.8726,
            "note": "No note.",
            "createdAt": "2024-04-21T20:26:17.368Z",
            "updatedAt": "2024-04-22T19:04:09.534Z",
            "__v": 0
        },
    ]);

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
                <div className="columns">
                    <MapViewer className="column" markers={markers} position={[35.5820, -80.8140]} zoom={13} />
                    <MapSidePanel className="column sidebar" />
                </div>
            </div >
        </>
    )
}

export default MapView;
