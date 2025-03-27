const Item = require("../models/Product");

// Add a new item
const addNewItem = async (req, res) => {
    try {
        const newItem = new Item(req.body);
        const savedItem = await newItem.save();
        return res.status(201).json({ success: true, data: savedItem, message: "New item successfully added" });
    } catch (error) {
        return res.status(400).json({ success: false, error: error.message });
    }
};

// Retrieve all items
const fetchAllItems = async (req, res) => {
    try {
        const itemList = await Item.find().populate("category");
        return res.status(200).json({ success: true, data: itemList });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Unable to retrieve item list" });
    }
};

// Fetch item details by ID
const fetchItemById = async (req, res) => {
    try {
        const foundItem = await Item.findById(req.params.itemId).populate("category");
        if (!foundItem) {
            return res.status(404).json({ success: false, message: "Item not found" });
        }
        return res.status(200).json({ success: true, data: foundItem });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Error fetching item details" });
    }
};

// Modify an item
const modifyItem = async (req, res) => {
    try {
        const updatedItem = await Item.findByIdAndUpdate(req.params.itemId, req.body, { new: true });
        if (!updatedItem) {
            return res.status(404).json({ success: false, message: "Item not found for update" });
        }
        return res.status(200).json({ success: true, data: updatedItem, message: "Item successfully updated" });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Failed to update item" });
    }
};

// Remove an item
const removeItem = async (req, res) => {
    try {
        const deletedItem = await Item.findByIdAndDelete(req.params.itemId);
        if (!deletedItem) {
            return res.status(404).json({ success: false, message: "Item not found" });
        }
        return res.status(200).json({ success: true, message: "Item successfully removed" });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Error deleting item" });
    }
};

module.exports = {
    addNewItem,
    fetchAllItems,
    fetchItemById,
    modifyItem,
    removeItem
};
