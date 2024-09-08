import express from "express";
import Product from "../models/product.model.js";
import mongoose from "mongoose";

const router = express.Router();

router.get('/', async (req, res) => {

    try {
        const products = await Product.find({}) //finds all products
        res.status(200).json({success: true, data: products})
    } catch (err) {
        res.status(500).json({success: false, message: err.message})
    }
})

router.delete('/:id', async (req, res) => {
    const {id} = req.params

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "Product deleted successfully"})
    } catch (err) {
        res.status(404).json({success: false, message: "Product not found"})
    }
})

router.put('/:id', async (req, res) => {
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
})

router.post('/', async (req, res) => {
    const product = req.body
    if (!product.name || !product.price || !product.image) {
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
})
export default router;