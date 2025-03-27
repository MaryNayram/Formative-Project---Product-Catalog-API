const mongoose = require("mongoose");

const categoryModel = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    details: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ProductCategory", categoryModel);
