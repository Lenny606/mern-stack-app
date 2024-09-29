import express from "express";
import {getProducts, deleteProduct, updateProduct, createProduct, searchProducts} from "../controllers/product.controller.js";

const router = express.Router();

router.get('/', getProducts);
router.get('/search/:name', searchProducts);
router.delete('/:id', deleteProduct)
router.put('/:id', updateProduct)
router.post('/', createProduct)
export default router;