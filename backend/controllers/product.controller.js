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
    const limit = parseInt(req.query.limit) || 5;
    const skip = parseInt(req.query.skip) || 0;

    try {
        const products = await Product.find({
            name: {$regex: name, $options: 'i'}
        })
            .limit(limit)
            .skip(skip)
            .sort({name: 1})

        if (products.length <= 0) {
            res.status(404).json({success: false, data: products, count: products.length, message: "No products found: " +name })
        }
        res.status(200).json({success: true, data: products, count: products.length})
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
        console.log("Error saving product" + err.message)
        res.status(500).json({success: false, message: "Product not saved", error: err.message})
    }
}