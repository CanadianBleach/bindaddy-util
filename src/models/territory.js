import mongoose, { Schema } from "mongoose";

const territory = new Schema (
    {
        name: String,
        boundingBox: Array
    },
    {
        timestamps: true,
    }
);

const Territory = mongoose.models.Territory || mongoose.model("Territory", territory);

export default Territory;