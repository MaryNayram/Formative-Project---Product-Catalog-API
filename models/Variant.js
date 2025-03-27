const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema({
    itemRef: { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true },
    shade: { type: String, required: true },
    dimension: { type: String, required: true },
    cost: { type: Number, required: true, min: 0 },
    quantityAvailable: { type: Number, default: 0 }
});

optionSchema.index({ itemRef: 1 });

module.exports = mongoose.model("Option", optionSchema);
