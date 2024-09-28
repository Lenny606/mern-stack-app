import mongoose from "mongoose";
import {BaseModel} from "../baseSchema.js";

const userSchema = new mongoose.Schema({
    isRegistered: {
        type: Boolean,
        default: false
    }
})
const UserBase = BaseModel.discriminator('UserBase', userSchema);
export default UserBase;
