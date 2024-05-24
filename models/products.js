const req = require("express/lib/request");
const { type } = require("express/lib/response");
const mongoose = require("mongoose");
const products = new mongoose.Schema(
  {
    product_name: { type: String, required: true },
    descript: { type: String, required: true },
    product_img: { type: String, required: true },
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
