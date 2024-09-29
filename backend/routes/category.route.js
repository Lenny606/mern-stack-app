import express from "express";
import {
    getCategory,
    deleteCategory,
    createCategory,
    updateCategory,
    searchCategories
} from "../controllers/category.controller.js";

const router = express.Router();

router.get('/', getCategory);
router.get('/search/:name', searchCategories);
router.delete('/:id', deleteCategory)
router.put('/:id', updateCategory)
router.post('/', createCategory)
export default router;