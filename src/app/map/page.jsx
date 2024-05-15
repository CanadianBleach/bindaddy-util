'use client'

import MarkerSidePanel from "@/components/MarkerSidePanel";
import Navbar from "@/components/Navbar";
import { useSession } from "next-auth/react";
import { redirect, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import TerritorySidePanel from "@/components/TerritorySidePanel";
import SidePanelManager from "@/components/SidePanelManger";

function MapView() {
    const fetchData = async (url) => {
        console.log("fetching");
        const response = await fetch(url);

        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            throw new Error(message);
        }

        const data = await response.json();
        return data;
    }

    // Session redireect
    const { data: session, status } = useSession();
    const searchParams = useSearchParams();

    const _id = searchParams.get('_id');
    
    // Wrapped as an array so that MapViewer can use the map function
    const [markers, setMarkers] = useState([]);
    const [territories, setTerritories] = useState([]);

    const [isMarker, setIsMarker] = useState(true);

    const MapViewer = useMemo(() => dynamic(
        () => import('@/components/MapViewer.jsx'),
        {
            loading: () => <p>A map is loading</p>,
            ssr: false
        }
    ), [])

    useEffect(() => {
        (async () => {
            const fetchedMarkers = await fetchData('/api/markers');
            const fetchedTerritories = await fetchData('api/territories');

            setMarkers(fetchedMarkers.markers);
            setTerritories(fetchedTerritories.territories);
        })();

        return () => {
            // this now gets called when the component unmounts
        };
    }, []);

    return (
        <>
            <Navbar />
            <div className="is-flex w-100 pl-3 pr-3">
                <MapViewer setIsMarker={setIsMarker} territories={territories} markers={markers} position={[35.5820, -80.8140]} zoom={13} />
                <SidePanelManager _id={_id} isMarker={isMarker} setIsMarker={setIsMarker}/>
            </div>
        </>
    )
}

export default MapView;
