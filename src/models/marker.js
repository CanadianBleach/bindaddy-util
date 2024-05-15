import mongoose, { Schema } from "mongoose";

const bdMarkerSchema = new Schema(
    {
        note: String,
        address: String,
        lat: Number,
        long: Number,
        firstName: String,
        lastName: String,
        email: String,
        active: Boolean,
    },
    {
        timestamps: true,
    }
);

const BDMarker = mongoose.models.BDMarker || mongoose.model("BDMarker", bdMarkerSchema);

export default BDMarker;

