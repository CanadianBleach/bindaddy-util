import { useSearchParams } from 'next/navigation'

// Icons
import { FaTrash } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
import { useEffect, useState } from 'react';

function MapSidePanel({ handleDelete }) {
    const [activeMarker, setActiveMarker] = useState({
        lat: 0,
        long: 0,
        note: "No Marker Selected",
        title: "Select a Marker",
        address: "",
        _id: "0"
    });

    // Form variables
    const [title, setTitle] = useState("");
    const [note, setNote] = useState("");

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleNoteChange = (e) => {
        setNote(e.target.value);
    };

    const searchParams = useSearchParams()
    const _id = searchParams.get('_id');

    async function handleSubmit(event) {
        event.preventDefault()

        let formData = {
            newTitle: title,
            newNote: note
        }

        // Check to see if any changes have been made
        if (title == "")
            formData.newTitle = activeMarker.title;
        if (note == "")
            formData.newNote = activeMarker.note;

        const response = await fetch(`/api/markers/${_id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const resData = await response.json();

        setActiveMarker(resData.marker);
        //Refresh
        console.log("PUT RESPONSE", resData);
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
            console.log("MARKER", marker.marker);
            setActiveMarker(marker.marker);
        })();
    }, [_id]);

    return (
        <>
            <form onSubmit={handleSubmit} className="is-flex form is-flex-direction-column is-justify-content-space-between">


                <div className=''>
                    <div>
                        <h2 className='title m-3'>{activeMarker.firstName}, {activeMarker.lastName}</h2>
                        <p className="m-3">{activeMarker.email}</p>
                        <hr className='' />
                        <div className="subtitle m-3">
                            {activeMarker.address}
                        </div>
                        <div className="m-3">
                            {activeMarker.lat}, {activeMarker.long}
                        </div>
                    </div>
                    <hr className="m-3" />
                    <div>
                        <div className="m-3 subtitle">
                            Details
                        </div>
                        <p className="m-3">
                            {activeMarker.active}
                        </p>
                        <p className="m-3">
                            Id: {activeMarker._id}
                        </p>
                        <p className="m-3">
                            {activeMarker.note}
                        </p>
                    </div>
                </div>



                <div className="mb-2">
                    <hr className="m-3" />
                    <input onChange={handleTitleChange} name="title" className="m-3 input" placeholder={activeMarker.title} />
                    <textarea onChange={handleNoteChange} name="note" className="m-3 textarea" placeholder={activeMarker.note}></textarea>
                    <div>
                        <button onClick={handleDelete} className="button m-1 is-danger">
                            <span className="icon is-small">
                                <FaTrash />
                            </span>
                            <span>Delete</span>
                        </button>
                        <button type='submit' className="button m-1 is-success">
                            <span className="icon is-small">
                                <FaCheck />
                            </span>
                            <span>Save</span>
                        </button>
                    </div>
                </div>
            </form >
        </>
    )
}

export default MapSidePanel;
