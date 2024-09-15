import mongoose from "mongoose";
import {BaseModel} from "../baseSchema.js";

const userSchema = new mongoose.Schema({
    isRegistered: {
        type: Boolean,
        default: false
    }
})

// export const User = BaseModel.discriminator('User', userSchema);

