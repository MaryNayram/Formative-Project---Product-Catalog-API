const express = require("express");
const categoryRoutes = express.Router();
const categoryService = require("../controllers/categoryController");
const validateInput = require("../middleware/validateRequest");
const Joi = require("joi");

// Validation rules
const categoryValidationSchema = Joi.object({
    title: Joi.string().required(),
    details: Joi.string().optional()
});

// API Endpoints
categoryRoutes.get("/", categoryService.retrieveCategories);
categoryRoutes.post("/", validateInput(categoryValidationSchema), categoryService.addNewCategory);
categoryRoutes.get("/:categoryId", categoryService.findCategoryById);
categoryRoutes.put("/:categoryId", validateInput(categoryValidationSchema), categoryService.editCategory);
categoryRoutes.delete("/:categoryId", categoryService.deleteCategoryRecord);

module.exports = categoryRoutes;
