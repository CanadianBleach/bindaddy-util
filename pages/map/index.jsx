'use client'

import MapSidePanel from "@/components/MapSidePanel";
import Navbar from "@/components/Navbar";
import "bulma/css/bulma.min.css";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";



function MapView() {
    const fetchMarkers = async () => {
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
            "_id": "66257669f077c95b055a4cfe",
            "title": "New Landing Landing",
            "address": "Lake Norman",
            "lat": 35.6034,
            "long": -80.8726,
            "note": "Updated note Landing",
            "createdAt": "2024-04-21T20:26:17.368Z",
            "updatedAt": "2024-04-22T19:04:09.534Z",
            "__v": 0
        },
        {
            "_id": "6625766df077c95b055a4d00",
            "title": "Lowe's Corporate Headquarters",
            "address": "1000 Lowe's Blvd, Mooresville, NC 28117",
            "lat": 35.5846,
            "long": -80.8431,
            "note": "Lowe's Corporate Headquarters",
            "createdAt": "2024-04-21T20:26:21.463Z",
            "updatedAt": "2024-04-21T20:26:21.463Z",
            "__v": 0
        },
        {
            "_id": "66257672f077c95b055a4d02",
            "title": "Mooresville Golf Course",
            "address": "800 Golf Course Dr, Mooresville, NC 28115",
            "lat": 35.5735,
            "long": -80.8374,
            "note": "Mooresville Golf Course",
            "createdAt": "2024-04-21T20:26:26.290Z",
            "updatedAt": "2024-04-21T20:26:26.290Z",
            "__v": 0
        },
        {
            "_id": "66257678f077c95b055a4d04",
            "title": "Bicentennial Park",
            "address": "525 E. Center Ave., Mooresville, NC 28115",
            "lat": 35.5793,
            "long": -80.8151,
            "note": "Bicentennial Park",
            "createdAt": "2024-04-21T20:26:32.898Z",
            "updatedAt": "2024-04-21T20:26:32.898Z",
            "__v": 0
        },
        {
            "_id": "6625767ef077c95b055a4d06",
            "title": "Mooresville Dragway",
            "address": "1255 Wilkinson Rd, Mooresville, NC 28115",
            "lat": 35.5707,
            "long": -80.8372,
            "note": "Mooresville Dragway",
            "createdAt": "2024-04-21T20:26:38.705Z",
            "updatedAt": "2024-04-21T20:26:38.705Z",
            "__v": 0
        },
        {
            "_id": "66257685f077c95b055a4d08",
            "title": "Memory Lane Motorsports & Historical Automotive Museum",
            "address": "769 River Hwy, Mooresville, NC 28117",
            "lat": 35.5798,
            "long": -80.8127,
            "note": "Memory Lane Motorsports & Historical Automotive Museum",
            "createdAt": "2024-04-21T20:26:45.499Z",
            "updatedAt": "2024-04-21T20:26:45.499Z",
            "__v": 0
        },
        {
            "_id": "6625768af077c95b055a4d0a",
            "title": "NC Auto Racing Hall of Fame",
            "address": "119 Knob Hill Rd, Mooresville, NC 28117",
            "lat": 35.5731,
            "long": -80.8128,
            "note": "NC Auto Racing Hall of Fame",
            "createdAt": "2024-04-21T20:26:50.803Z",
            "updatedAt": "2024-04-21T20:26:50.803Z",
            "__v": 0
        },
        {
            "_id": "6625768ff077c95b055a4d0c",
            "title": "Trump National Golf Club Charlotte",
            "address": "120 Trump Sq, Mooresville, NC 28117",
            "lat": 35.5962,
            "long": -80.882,
            "note": "Trump National Golf Club Charlotte",
            "createdAt": "2024-04-21T20:26:55.114Z",
            "updatedAt": "2024-04-21T20:26:55.114Z",
            "__v": 0
        },
        {
            "_id": "66257695f077c95b055a4d0e",
            "title": "Queens Landing",
            "address": "1459 River Hwy, Mooresville, NC 28117",
            "lat": 35.6034,
            "long": -80.8726,
            "note": "Queens Landing",
            "createdAt": "2024-04-21T20:27:01.515Z",
            "updatedAt": "2024-04-21T20:27:01.515Z",
            "__v": 0
        }
    ]);

    const MapViewer = useMemo(() => dynamic(
        () => import('@/components/MapViewer'),
        {
            loading: () => <p>A map is loading</p>,
            ssr: false
        }
    ), [])

    /* useEffect(() => {
        (async () => {
            const fetchedMarkers = await fetchMarkers();
            setMarkers(fetchedMarkers.markers);
        })();

        return () => {
            // this now gets called when the component unmounts
        };
    }, []); */

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
