const Option = require("../models/Variant");

// Add a new option
const addOption = async (req, res) => {
    try {
        const newOption = new Option(req.body);
        const savedOption = await newOption.save();
        return res.status(201).json({ success: true, data: savedOption, message: "New option successfully added" });
    } catch (err) {
        return res.status(400).json({ success: false, error: "Failed to add new option" });
    }
};

// Retrieve all options
const fetchAllOptions = async (req, res) => {
    try {
        const optionList = await Option.find().populate("linkedProduct");
        return res.status(200).json({ success: true, data: optionList });
    } catch (err) {
        return res.status(500).json({ success: false, error: "Unable to fetch options" });
    }
};

// Fetch an option by ID
const fetchOptionById = async (req, res) => {
    try {
        const foundOption = await Option.findById(req.params.optionId).populate("linkedProduct");
        if (!foundOption) {
            return res.status(404).json({ success: false, message: "Option not found" });
        }
        return res.status(200).json({ success: true, data: foundOption });
    } catch (err) {
        return res.status(500).json({ success: false, error: "Error retrieving option details" });
    }
};

// Modify an option
const modifyOption = async (req, res) => {
    try {
        const updatedOption = await Option.findByIdAndUpdate(req.params.optionId, req.body, { new: true });
        if (!updatedOption) {
            return res.status(404).json({ success: false, message: "Option not found for update" });
        }
        return res.status(200).json({ success: true, data: updatedOption, message: "Option successfully updated" });
    } catch (err) {
        return res.status(500).json({ success: false, error: "Failed to update option" });
    }
};

// Remove an option
const removeOption = async (req, res) => {
    try {
        const deletedOption = await Option.findByIdAndDelete(req.params.optionId);
        if (!deletedOption) {
            return res.status(404).json({ success: false, message: "Option not found" });
        }
        return res.status(200).json({ success: true, message: "Option successfully removed" });
    } catch (err) {
        return res.status(500).json({ success: false, error: "Error deleting option" });
    }
};

module.exports = {
    addOption,
    fetchAllOptions,
    fetchOptionById,
    modifyOption,
    removeOption
};
