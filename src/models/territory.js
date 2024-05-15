import mongoose, { Schema } from "mongoose";

const territory = new Schema (
    {
        name: String,
        note: String,
        boundingBox: Array,
        pins: Array,
        size: Number
    },
    {
        timestamps: true,
    }
);

const Territory = mongoose.models.Territory || mongoose.model("Territory", territory);

export default Territory;