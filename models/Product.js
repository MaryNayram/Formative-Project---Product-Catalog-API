const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema({
  shade: { type: String, required: true },
  dimension: { type: String, required: true },
  quantityAvailable: { type: Number, required: true },
});

const itemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    details: { type: String },
    cost: { type: Number, required: true },
    categoryRef: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    options: [optionSchema], 
    quantityAvailable: { type: Number, default: 0 }, 
    priceReduction: { type: Number, default: 0 },
    addedOn: { type: Date, default: Date.now },
  },
  { timestamps: true } 
);

module.exports = mongoose.model("Item", itemSchema);
