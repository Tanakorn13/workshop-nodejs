const mongoose = require("mongoose");
const products = new mongoose.Schema({
  product_name: { type: String, required: true },
  price: { type: Number, required: true },
  amount: { type: Number, required: true },
  Orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("products", products);
