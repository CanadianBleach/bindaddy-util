import { useSearchParams } from 'next/navigation'
import { FormEvent } from 'react'

// Icons
import { FaTrash } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { useEffect, useState } from 'react';

function editPin() {

}

function MapSidePanel({ markerId, handleDelete }) {
    const [activeMarker, setActiveMarker] = useState({
        lat: 0,
        long: 0,
        note: "No Marker Selected",
        title: "Select a Marker",
        address: "",
        _id: "0"
    });

    const searchParams = useSearchParams()
    const _id = searchParams.get('_id');

    async function onSubmit(event) {
        event.preventDefault()

/*         const formData = new FormData(event.currentTarget)
 */        console.log(event.currentTarge);

        /* const response = await fetch(`/api/markers`, {
            method: 'PUT',
            body: formData,
        }) */
    }

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
                        <h2 className='title m-3'>{activeMarker.title}</h2>
                        <div className="subtitle m-3">
                            {activeMarker.lat}, {activeMarker.long}
                        </div>
                    </div>
                    <hr className="m-3" />
                    <div>
                        <div className="m-3 subtitle">
                            Details
                        </div>
                        <p className="m-3">
                            Id: {_id}
                        </p>
                        <p className='m-3'>{activeMarker.note}</p>
                    </div>
                    <hr className='m-3' />

                </div>
                <form className="mb-2">
                    <hr className="m-3" />
                    <input className="m-3 input" placeholder={activeMarker.title} />
                    <textarea className="m-3 textarea" placeholder={activeMarker.note}></textarea>
                    <div>
                        <button onClick={handleDelete} className="button m-1 is-danger">
                            <span className="icon is-small">
                                <FaTrash />
                            </span>
                            <span>Delete</span>
                        </button>
                        <button onClick={onSubmit} type='submit' className="button m-1 is-success">
                            <span className="icon is-small">
                                <FaCheck />
                            </span>
                            <span>Save</span>
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default MapSidePanel;
