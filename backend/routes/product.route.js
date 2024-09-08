import express from "express";
import {getProducts, deleteProduct, updateProduct, createProduct} from "../controllers/product.controller.js";

const router = express.Router();

router.get('/', getProducts);
router.delete('/:id', deleteProduct)
router.put('/:id', updateProduct)
router.post('/', createProduct)
export default router;