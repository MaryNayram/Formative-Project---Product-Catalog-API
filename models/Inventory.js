const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({
    item: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    stockCount: { type: Number, required: true, default: 0 },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Stock", stockSchema);
