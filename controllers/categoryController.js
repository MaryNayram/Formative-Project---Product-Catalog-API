const CategoryModel = require("../models/Category");

// Add a new category
const addCategory = async (req, res) => {
    try {
        const newCategory = new CategoryModel(req.body);
        const savedCategory = await newCategory.save();
        return res.status(201).json({ success: true, data: savedCategory, message: "New category added!" });
    } catch (err) {
        return res.status(400).json({ success: false, error: err.message });
    }
};

// Retrieve all categories
const fetchCategories = async (req, res) => {
    try {
        const categoryList = await CategoryModel.find();
        return res.status(200).json({ success: true, data: categoryList });
    } catch (err) {
        return res.status(500).json({ success: false, error: "Unable to fetch categories" });
    }
};

// Get a category by ID
const fetchCategoryById = async (req, res) => {
    try {
        const foundCategory = await CategoryModel.findById(req.params.id);
        if (!foundCategory) {
            return res.status(404).json({ success: false, message: "No category found with this ID" });
        }
        return res.status(200).json({ success: true, data: foundCategory });
    } catch (err) {
        return res.status(500).json({ success: false, error: "Error retrieving category" });
    }
};

// Modify an existing category
const modifyCategory = async (req, res) => {
    try {
        const updatedCategory = await CategoryModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCategory) {
            return res.status(404).json({ success: false, message: "Category not found for update" });
        }
        return res.status(200).json({ success: true, data: updatedCategory, message: "Category successfully updated!" });
    } catch (err) {
        return res.status(500).json({ success: false, error: "Failed to update category" });
    }
};

// Remove a category
const removeCategory = async (req, res) => {
    try {
        const deletedCategory = await CategoryModel.findByIdAndDelete(req.params.id);
        if (!deletedCategory) {
            return res.status(404).json({ success: false, message: "Category does not exist" });
        }
        return res.status(200).json({ success: true, message: "Category removed successfully" });
    } catch (err) {
        return res.status(500).json({ success: false, error: "Error deleting category" });
    }
};

module.exports = {
    addCategory,
    fetchCategories,
    fetchCategoryById,
    modifyCategory,
    removeCategory
};
