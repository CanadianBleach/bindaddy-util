import { useSearchParams } from 'next/navigation'

// Icons
import { FaTrash } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { useEffect, useState } from 'react';

function editPin () {
    
}

function MapSidePanel({ markerId, handleDelete }) {
    const [activeMarker, setActiveMarker] = useState({
        lat: 35.5820,
        long: -80.8140,
        note: "Loading Marker Data",
        title: "Loading Marker Title",
        address: "Loading Address",
        _id: "0"
    });

    const searchParams = useSearchParams()
    const _id = searchParams.get('_id');

    console.log(activeMarker);

    useEffect(() => {
        (async () => {
            if (_id === null)
                return;

            const response = await fetch(`/api/markers/${_id}`);

            if (!response.ok) {
                const message = `An error has occured: ${response.status}`;
                throw new Error(message);
            }

            const marker = await response.json();
            console.log(marker.marker);
            setActiveMarker(marker.marker);
        })();
    }, [_id]);

    return (
        <>
            <div className="is-flex is-flex-direction-column is-justify-content-space-between">
                <div>
                    <div>
                        <div className="m-3 title">
                            {activeMarker.title}
                        </div>
                        <div className="subtitle m-3">
                            {activeMarker.lat}, {activeMarker.long}
                        </div>
                    </div>
                    <hr className="m-3" />
                    <div>
                        <div className="m-3 subtitle">
                            Details
                        </div>
                        <div className="m-3 subtitle">
                            Id: {_id}
                        </div>
                        <p className="m-3">
                            Description: {activeMarker.note}
                        </p>
                    </div>
                </div>
                <div className="mb-2">
                    <hr className="m-3" />
                    <button onClick={handleDelete} className="button m-1 is-danger">
                        <span className="icon is-small">
                            <FaTrash />
                        </span>
                        <span>Delete</span>
                    </button>
                    <button onClick={editPin} className="button m-1 is-warning">
                        <span className="icon is-small">
                            <FaPencilAlt />
                        </span>
                        <span>Edit</span>
                    </button>
                    <button className="button m-1 is-success">
                        <span className="icon is-small">
                            <FaCheck />
                        </span>
                        <span>Save</span>
                    </button>
                </div>
            </div>
        </>
    )
}

export default MapSidePanel;
