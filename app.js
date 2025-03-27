const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // Enable CORS for cross-origin requests
app.use(morgan("dev")); // Log API requests

// Import middleware
const errorHandler = require("./middleware/errorHandler");

// Import routes directly
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const variantRoutes = require("./routes/variantRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");
const searchRoutes = require("./routes/searchRoutes");

// Use API routes
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/variants", variantRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/search", searchRoutes);

// Handle unknown routes
app.use((req, res, next) => {
    res.status(404).json({ success: false, message: "Route not found" });
});

// Error handling middleware (must be last)
app.use(errorHandler);

module.exports = app;
