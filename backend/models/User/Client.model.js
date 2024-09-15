import mongoose from "mongoose";
import User from "./User.model.js";

const clientSchema = mongoose.Schema(
    {
        products: Array,
        address: String,
        phone: String,
    }
);

const Client = User.discriminator("Client", clientSchema);
export default Client;