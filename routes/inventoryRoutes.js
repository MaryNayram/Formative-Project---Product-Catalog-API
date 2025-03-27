const express = require("express");
const inventoryRoutes = express.Router();
const inventoryService = require("../controllers/inventoryController");
const validateInput = require("../middleware/validateRequest");
const Joi = require("joi");

// Validation schema
const inventoryValidationSchema = Joi.object({
    productRef: Joi.string().required(),
    stockCount: Joi.number().integer().min(0).required(),
});

// API Routes
inventoryRoutes.get("/", inventoryService.fetchAllInventory);
inventoryRoutes.post("/", validateInput(inventoryValidationSchema), inventoryService.addOrUpdateInventory);
inventoryRoutes.get("/:inventoryId", inventoryService.findInventoryById);
inventoryRoutes.put("/:inventoryId", validateInput(inventoryValidationSchema), inventoryService.modifyInventory);
inventoryRoutes.delete("/:inventoryId", inventoryService.removeInventoryRecord);

module.exports = inventoryRoutes;
