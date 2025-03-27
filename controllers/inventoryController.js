const Stock = require("../models/Inventory");

// Add or modify stock details
const manageStock = async (req, res) => {
    try {
        const { itemId, stockLevel } = req.body;

        // Check if stock record exists for this item
        const existingStock = await Stock.findOne({ product: itemId });

        if (existingStock) {
            // Update the existing stock record
            existingStock.quantity = stockLevel;
            existingStock.lastModified = new Date();
            await existingStock.save();
            return res.status(200).json({ success: true, data: existingStock, message: "Stock updated successfully" });
        } else {
            // Create a new stock record
            const newStock = new Stock({
                product: itemId,
                quantity: stockLevel,
                lastModified: new Date(),
            });
            await newStock.save();
            return res.status(201).json({ success: true, data: newStock, message: "New stock entry created" });
        }
    } catch (err) {
        return res.status(500).json({ success: false, error: "Error managing stock" });
    }
};

// Retrieve all stock records
const listAllStock = async (req, res) => {
    try {
        const stockRecords = await Stock.find().populate("product");
        return res.status(200).json({ success: true, data: stockRecords });
    } catch (err) {
        return res.status(500).json({ success: false, error: "Unable to retrieve stock records" });
    }
};

// Fetch stock details by product ID
const getStockByProduct = async (req, res) => {
    try {
        const stockData = await Stock.findOne({ product: req.params.productId }).populate("product");
        if (!stockData) {
            return res.status(404).json({ success: false, message: "Stock details not found" });
        }
        return res.status(200).json({ success: true, data: stockData });
    } catch (err) {
        return res.status(500).json({ success: false, error: "Error retrieving stock details" });
    }
};

// Modify stock quantity
const adjustStockLevel = async (req, res) => {
    try {
        const updatedStock = await Stock.findOneAndUpdate(
            { product: req.params.productId },
            { quantity: req.body.stockLevel, lastModified: new Date() },
            { new: true }
        );

        if (!updatedStock) {
            return res.status(404).json({ success: false, message: "Stock record not found" });
        }

        return res.status(200).json({ success: true, data: updatedStock, message: "Stock quantity adjusted" });
    } catch (err) {
        return res.status(500).json({ success: false, error: "Failed to update stock" });
    }
};

// Remove a stock entry
const removeStockRecord = async (req, res) => {
    try {
        const deletedStock = await Stock.findByIdAndDelete(req.params.stockId);
        if (!deletedStock) {
            return res.status(404).json({ success: false, message: "Stock entry not found" });
        }
        return res.status(200).json({ success: true, message: "Stock record removed" });
    } catch (err) {
        return res.status(500).json({ success: false, error: "Error deleting stock record" });
    }
};

module.exports = {
    manageStock,
    listAllStock,
    getStockByProduct,
    adjustStockLevel,
    removeStockRecord
};
