import mongoose from "mongoose";
import User from "./User.model.js";
export const sellerSchema = mongoose.Schema(
    {
        rating: Number,
        businessType: { type: String, enum: ["individual", "corporation"] },
    }
);

const Seller = User.discriminator("Seller", sellerSchema);
export default Seller;