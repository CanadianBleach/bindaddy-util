'use client'

import MapSidePanel from "@/components/MapSidePanel";
import Navbar from "@/components/Navbar";
import "bulma/css/bulma.min.css";
import dynamic from "next/dynamic";
import { useMemo } from "react";

function MapView() {
    const MapViewer = useMemo(() => dynamic(
        () => import('@/components/MapViewer'),
        {
            loading: () => <p>A map is loading</p>,
            ssr: false
        }
    ), [])

    return (
        <>
            <Navbar />
            <div className="is-flex">
                <MapViewer position={[35.5820, -80.8140]} zoom={13} />
                <MapSidePanel />
            </div >
        </>
    )
}

export default MapView;
