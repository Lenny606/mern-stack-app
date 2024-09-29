import Category from "../models/Category/Category.model.js";
import mongoose from "mongoose";

export const getCategory = async (req, res) => {

    try {
        const categories = await Category.find({}).sort({name: -1}) //finds all cats + sorts by name
        res.status(200).json({success: true, data: categories})
    } catch (err) {
        res.status(500).json({success: false, message: err.message})
    }
}
export const deleteCategory = async (req, res) => {
    const {id} = req.params

    try {
        await Category.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "Category deleted successfully"})
    } catch (err) {
        res.status(404).json({success: false, message: "Category not found"})
    }
}

export const updateCategory = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({success: false, message: "Id invalid"})
    }

    const category = req.body

    try {
        const updatedCategory = await Category.findByIdAndUpdate(id, category, {new: true});
        res.status(200).json({success: true, message: "Category updated successfully", data: updatedCategory})
    } catch (err) {
        res.status(500).json({success: false, message: err.message})
    }
}

export const createCategory = async (req, res) => {
    const category = req.body
    if (!category.name || !category.description || !category.image) {
        return res.status(400).json({success: false, message: "Some fields ware not provided"})
    }

    const newCategory = new Category(category)

    try {
        await newCategory.save()
        res.status(200).json({success: true, message: "Category saved successfully", data: newCategory})
    } catch (err) {
        console.log("Error saving category" + err.message)
        res.status(500).json({success: false, message: "Category not saved", error: err.message})
    }
}
export const searchCategories = async (req, res) => {
    const {name} = req.params
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    try {
        const searchQuery = {
            name: { $regex: name, $options: 'i' }
        };

        const [categories, total] = await Promise.all([
            Category.find(searchQuery)
                .limit(limit)
                .skip(skip)
                .sort({ name: 1 })
                .lean(),
            Category.countDocuments(searchQuery)
        ]);

        const totalPages = Math.ceil(total / limit);
        const response = {
            success: true,
            data: categories,
            count: categories.length,
            pagination: {
                currentPage: page,
                totalPages: totalPages,
                totalItems: total,
                itemsPerPage: limit,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1
            }
        };

        if (categories.length === 0) {
            response.message = `No categories found matching: ${name}`;
        }

        res.status(200).json({response})
    } catch (err) {
        res.status(500).json({success: false, message: err.message})
    }
}