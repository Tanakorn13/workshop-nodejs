const mongoose = require("mongoose");
const products = new mongoose.Schema(
  {
    product_name: { type: String, required: true },
    price: { type: Number, required: true },
    amount: { type: Number, required: true },
    Orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Orders",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("products", products);
