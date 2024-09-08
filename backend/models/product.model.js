import mongoose from "mongoose";

//define schema
const productSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        images: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    });

const Product = mongoose.model('Product', productSchema)
export default Product;