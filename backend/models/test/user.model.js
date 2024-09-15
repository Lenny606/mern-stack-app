import mongoose from "mongoose";
import {BaseModel} from "../baseSchema.js";

const userSchema = new mongoose.Schema({
    isRegistered: {
        type: Boolean,
        default: false
    }
})
const User = BaseModel.discriminator('User', userSchema);
export default User;
