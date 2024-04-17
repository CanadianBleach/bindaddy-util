// Icons
import { FaTrash } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";

function MapSidePanel({ markerId, handleDelete }) {
    const markerData = [0, 0, "Connor's House", "Where I live."]

    return (
        <>
            <div className="is-flex is-flex-direction-column is-justify-content-space-between">
                <div>
                    <div>
                        <div className="m-3 title">
                            {markerData[2]}
                        </div>
                        <div className="subtitle m-3">
                            {markerData[0]}, {markerData[1]}
                        </div>
                    </div>
                    <hr className="m-3" />
                    <div>
                        <div className="m-3 subtitle">
                            Details
                        </div>
                        <div className="m-3 subtitle">
                            Id: {markerId}
                        </div>
                        <p className="m-3">
                            Description: {markerData[3]}
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
                    <button className="button m-1 is-warning">
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
