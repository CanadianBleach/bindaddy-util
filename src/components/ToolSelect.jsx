import { useSearchParams } from 'next/navigation'

// Icons
import { FaTrash } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
import { use, useEffect, useState } from 'react';
import { PiPolygonLight } from "react-icons/pi";
import { LiaMapMarkerAltSolid } from "react-icons/lia";

function ToolSelect({ handleDelete }) {
    const [sidePanelState, setSidePanelState] = useState("marker");

    return (
        <>
            <div>
                <hr className='m-3' />
                <button onClick={() => setSidePanelState("marker")} className="m-3">
                    <span className="">
                        <LiaMapMarkerAltSolid className='is-size-3 m-1' />
                    </span>
                </button>
                <button onClick={() => setSidePanelState("territory")} className="m-3">
                    <span className="">
                        <PiPolygonLight className='is-size-3 m-1' />
                    </span>
                </button>
            </div>
        </>
    )
}

export default ToolSelect;
