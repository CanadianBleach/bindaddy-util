import { useSearchParams } from 'next/navigation'

// Icons
import { FaTrash } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
import { use, useEffect, useState } from 'react';

function TerritorySidePanel({ handleDelete, _id }) {
    const [activeTerritory, setActiveTerritory] = useState({
        "_id": "66391cff14670a69efca5742",
        "name": "Test Circle",
        "note": "Test note",
        "boundingBox": [
            [
                35.61734353883456,
                -80.68437471016514
            ]
        ],
        "pins": [

        ],
        "size": 1000,
        "createdAt": "2024-05-06T18:10:07.686Z",
        "updatedAt": "2024-05-06T18:10:07.686Z",
        "__v": 0
    });

    useEffect(() => {
        if (_id === null) {
            return (
                <></>
            );
        }

        (async () => {
            const response = await fetch(`/api/territories/${_id}`);

            if (!response.ok) {
                const message = `An error has occured: ${response.status}`;
                throw new Error(message);
            }

            const territory = await response.json();
            console.log("TERRITORY", territory.territory);

            if (territory.territory) {
                setActiveTerritory(territory.territory);
            }
        })();
    }, [_id]);

    return (
        <>
            <form className="w-100 is-flex form is-flex-direction-column is-justify-content-space-between">
                <div className=''>
                    <div className='has-text-right'>
                        <h2 className='title m-3'>{activeTerritory.name}</h2>
                        <p className="m-3"></p>
                        <hr className='m-3' />
                        <div className="subtitle m-3">
                            {0}
                        </div>
                        <div className="m-3">
                            {0}, {0}
                        </div>
                    </div>
                    <div>
                        <div className='has-text-right'>
                            <div className="m-3 subtitle">
                                Details
                            </div>
                            <p className="m-3">
                                Status: <span className='has-text-warning'>Inactive</span>
                            </p>
                        </div>
                        <hr className='m-3' />
                        <h3 className='subtitle m-3'>Notes</h3>
                        <p className="m-3">
                            {activeTerritory.note}
                        </p>
                    </div>
                </div>
                <div className="w-100 mb-2">
                    <p className="m-3">
                        Edit Marker
                    </p>
                    <textarea name="note" className="mb-3 mt-3   textarea" placeholder={0}></textarea>
                    <div>
                        <button className="button m-1 is-danger">
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

export default TerritorySidePanel;
