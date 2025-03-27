const express = require("express");
const searchRoutes = express.Router();
const productSearchService = require("../controllers/searchController");

// Route for searching and filtering products
searchRoutes.get("/", productSearchService.filterProducts);

module.exports = searchRoutes;
