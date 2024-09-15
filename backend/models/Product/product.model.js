import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    compareAtPrice: {
        type: Number,
        min: 0
    },
    category: {
        type: String,
        required: true
    },
    brand: {
        type: String
    },
    sku: {
        type: String,
        unique: true
    },
    inventory: {
        type: Number,
        required: true,
        min: 0
    },
    images: [{
        type: String,
        required: true
    }],
    attributes: {
        type: Map,
        of: String
    },
    isActive: {
        type: Boolean,
        default: true
    },
    tags: [String],
    weight: {
        type: Number,
        min: 0
    },
    dimensions: {
        length: Number,
        width: Number,
        height: Number
    },
    ratings: {
        average: {
            type: Number,
            min: 0,
            max: 5,
            default: 0
        },
        count: {
            type: Number,
            default: 0
        }
    }
}, {
    timestamps: true
});

productSchema.query.paginate = function ({ page, limit }) {
    // some code
    const skip = limit * (page - 1);
    return this.skip(skip).limit(limit);
};


const Product = mongoose.model('Product', productSchema);
export default Product;