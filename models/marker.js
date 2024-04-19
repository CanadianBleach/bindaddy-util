import mongoose, { Schema } from "mongoose";

const bdMarkerSchema = new Schema (
    {
        lat: Number,
        long: Number,
        note: String,
    },
    {
        timestamps: true,
    }
);

const BDMarker = mongoose.model.BDMarker || mongoose.model("BDMarker", bdMarkerSchema);

export default BDMarker;

