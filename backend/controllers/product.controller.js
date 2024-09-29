import Product from "../models/Product/product.model.js";
import mongoose from "mongoose";

export const getProducts = async (req, res) => {

    const token = req.headers.authorization.split(" ")[1]
    if (!token) {
        return res.status(401).json({success: false, message: "Unauthorized"})
    }
    try {
        const products = await Product.find({}).sort({updatedAt: -1}) //finds all products + sorts by updated
        res.status(200).json({success: true, data: products})
    } catch (err) {
        res.status(500).json({success: false, message: err.message})
    }
}
export const searchProducts = async (req, res) => {
    const {name} = req.params
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    try {
        const searchQuery = {
            name: { $regex: name, $options: 'i' }
        };

        const [products, total] = await Promise.all([
            Product.find(searchQuery)
                .limit(limit)
                .skip(skip)
                .sort({ name: 1 })
                .lean(),
            Product.countDocuments(searchQuery)
        ]);

        const totalPages = Math.ceil(total / limit);
        const response = {
            success: true,
            data: products,
            count: products.length,
            pagination: {
                currentPage: page,
                totalPages: totalPages,
                totalItems: total,
                itemsPerPage: limit,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1
            }
        };
        console.log(response)
        if (products.length === 0) {
            response.message = `No products found matching: ${name}`;
        }

        res.status(200).json({response})
    } catch (err) {
        res.status(500).json({success: false, message: err.message})
    }
}
export const deleteProduct = async (req, res) => {
    const {id} = req.params

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "Product deleted successfully"})
    } catch (err) {
        res.status(404).json({success: false, message: "Product not found"})
    }
}

export const updateProduct = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({success: false, message: "Id invalid"})
    }

    const product = req.body

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true});
        res.status(200).json({success: true, message: "Product updated successfully", data: updatedProduct})
    } catch (err) {
        res.status(500).json({success: false, message: err.message})
    }
}

export const createProduct = async (req, res) => {
    const product = req.body
    if (!product.name || !product.price || !product.images) {
        return res.status(400).json({success: false, message: "Some fields ware not provided"})
    }

    const newProduct = new Product(product)

    try {
        await newProduct.save()
        res.status(200).json({success: true, message: "Product saved successfully", data: newProduct})
    } catch (err) {
        res.status(500).json({success: false, message: "Product not saved", error: err.message})
    }
}