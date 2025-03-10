const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  style_code: String,
  option_code: String,
  EAN_code: { type: String, unique: true },
  MRP: Number,
  Brick: { type: String, enum: ["Shirt", "T-shirt", "Jeans", "Trouser"] },
  Sleeve: {
    type: String,
    enum: ["Full Sleeve", "Half Sleeve", "Sleeveless"],
  },
});

module.exports = mongoose.model("Product", productSchema);
