import mongoose, { Schema } from "mongoose";

const bdMarkerSchema = new Schema (
    {
        title: String,
        address: String,
        lat: Number,
        long: Number,
        note: String,
    },
    {
        timestamps: true,
    }
);

const BDMarker = mongoose.models.BDMarker || mongoose.model("BDMarker", bdMarkerSchema);

export default BDMarker;

