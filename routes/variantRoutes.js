const express = require("express");
const variantRoutes = express.Router();
const variantService = require("../controllers/variantController");
const validateInput = require("../middleware/validateRequest");
const Joi = require("joi");

// Schema for validating variant data
const variantValidationSchema = Joi.object({
    productRef: Joi.string().required(),
    shade: Joi.string().required(),
    dimension: Joi.string().required(),
    availableStock: Joi.number().integer().min(0).required(),
    cost: Joi.number().positive().required(),
});

// Variant Routes
variantRoutes.get("/", variantService.fetchAllVariants);
variantRoutes.post("/", validateInput(variantValidationSchema), variantService.addVariant);
variantRoutes.get("/:id", variantService.fetchVariantById);
variantRoutes.put("/:id", validateInput(variantValidationSchema), variantService.modifyVariant);
variantRoutes.delete("/:id", variantService.removeVariant);

module.exports = variantRoutes;
