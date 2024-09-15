import mongoose from "mongoose";

const baseSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
    }, {discriminatorKey: 'kind'} // defaults to '__t'
);

export const BaseModel = mongoose.model('Base', baseSchema);