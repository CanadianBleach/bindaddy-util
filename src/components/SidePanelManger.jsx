'use client'

import { useEffect, useState } from "react";
import MarkerSidePanel from "./MarkerSidePanel";
import TerritorySidePanel from "./TerritorySidePanel";

const SidePanelManager = ({ _id, isMarker }) => {
    return (
        <>
            {isMarker ? <MarkerSidePanel _id={_id}/> : <TerritorySidePanel _id={_id} />}
        </>
    );
}

export default SidePanelManager;