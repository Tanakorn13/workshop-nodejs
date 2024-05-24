const { type } = require("express/lib/response");
const mongoose = require("mongoose");
const orderSchema = mongoose.Schema(
  {
    product_name: { type: String },
    price: { type: Number },
    amount: { type: Number },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
  },
  { timestamps: true }
);

const newlistSchema = new mongoose.Schema({
    orderlist: [orderSchema]
  });

module.exports = mongoose.model("Newlist", newlistSchema);
