const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema({
    items: [
        {
            item: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
            count: { type: Number, required: true }
        }
    ],
    totalCost: { type: Number, required: true },
    orderStatus: { type: String, enum: ["Pending", "Completed", "Cancelled"], default: "Pending" },
    orderDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Purchase", purchaseSchema);
