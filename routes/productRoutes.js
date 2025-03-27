const express = require("express");
const productRoutes = express.Router();
const productService = require("../controllers/productController");
const validateInput = require("../middleware/validateRequest");
const Joi = require("joi");

// Validation schema for product data
const productValidationSchema = Joi.object({
    title: Joi.string().required(),
    details: Joi.string().optional(),
    cost: Joi.number().positive().required(),
    categoryRef: Joi.string().required(),
    availableStock: Joi.number().integer().min(0).required(),
});

// API Endpoints
productRoutes.get("/", productService.fetchAllProducts);
productRoutes.post("/", validateInput(productValidationSchema), productService.addNewProduct);
productRoutes.get("/:productId", productService.getSingleProduct);
productRoutes.put("/:productId", validateInput(productValidationSchema), productService.modifyProductDetails);
productRoutes.delete("/:productId", productService.removeProduct);

module.exports = productRoutes;
