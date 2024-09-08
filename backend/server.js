import express from 'express';
import {connectDB} from "./config/db.js";
import Product from "./models/product.model.js";


const app = express();

app.use(express.json()) //MW allows to accept json data in body

app.get('/api/products', (req, res) => {
    res.send("hello")
})

app.post('/api/products', async (req, res) => {
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

app.listen(5000, (err, res) => {
    connectDB();
    console.log("server listening on port 5000");
})