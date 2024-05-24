var express = require("express");
var router = express.Router();
const productModel = require("../models/products");
const mongoose = require("mongoose");
// const OrderProduct = require('../models/ordersProducts');
const Orders = require("../models/orders");
const jwt = require("../middleware/jwt");
const passport = require("../middleware/passport");
const roleGuard = require("../middleware/roleGuard");
router.get(
  "/",
  // [passport, roleGuard(["user", "admin"])],
  async function (req, res, next) {
    try {
      let products = await productModel.find();
      return res.status(200).send({
        data: products,
        status: 200,
        message: "get success",
        success: true,
      });
    } catch (error) {
      return res.status(500).send({
        status: 500,
        message: "get fail",
        success: false,
      });
    }
  }
);

router.get(
  "/:id",
  // [passport, roleGuard(["user", "admin"])],
  async function (req, res, next) {
    let id = req.params.id;
    // console.log(id);
    try {
      const product = await productModel.findById(id);
      if (!product) {
        return res.status(400).send({
          status: 400,
          message: "id Invalid",
          success: false,
          error: ["id is not a ObjectId"],
        });
      }
      // let products = await productModel.findById(id);
      return res.status(200).send({
        status: 200,
        data: product,
        message: "success",
        success: true,
      });
    } catch (error) {
      return res.status(500).send({
        status: 500,
        message: "server error",
        success: false,
      });
    }
  }
);

router.get(
  "/:id/orders",
  // [passport, roleGuard(["user", "admin"])],
  async function (req, res, next) {
    try {
      const productId = req.params.id;
      const orders = await Orders.find({ productId }).populate("productId");
      console.log(orders);
      res.json(orders);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

router.post(
  "/",
  // [passport, roleGuard(["user", "admin"])],
  async function (req, res, next) {
    try {
      const { product_name, descript, product_img, price, amount } = req.body;
      // console.log(product_name, price, amount);
      let newProduct = new productModel({
        product_name: product_name,
        descript: descript,
        product_img: product_img,
        price: price,
        amount: amount,
      });
      let product = await newProduct.save();
      return res.status(200).send({
        data: product,
        status: 200,
        message: "create success",
        success: true,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        status: 500,
        message: "create fail",
        success: false,
      });
    }
  }
);

router.post(
  "/:id/orders",
  // [passport, roleGuard(["user", "admin"])],
  async function (req, res, next) {
    const id = req.params.id;
    try {
      const { product_name, amount, productId } = req.body;

      const product = await productModel.findById(id);

      if (!product) {
        return res.status(404).send({
          status: 404,
          message: "Product not found",
          success: false,
        });
      }

      if (product.amount === 0 && product.amount < amount) {
        return res.status(400).send({
          status: 400,
          message: "Product out of stock",
          success: false,
        });
      }
      // Create a new order
      const newOrder = new Orders({
        product_name: product.product_name,
        amount,
        productId: id,
      });

      // Save the order to the database
      await newOrder.save();

      // Update product to include the order ID in its 'order' array
      product.Orders.push(newOrder._id);
      product.amount -= amount;
      await product.save();

      // Respond with success message
      res.status(200).json({
        status: 200,
        data: newOrder,
        message: "Order added successfully",
        success: true,
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({
        status: 500,
        message: "Internal Server Error",
        success: false,
      });
    }
  }
);

router.put(
  "/:id",
  // [passport, roleGuard(["user", "admin"])],
  async function (req, res, next) {
    const id = req.params.id;
    const { product_name, descript, product_img, price, amount } = req.body;

    try {
      // check product in db
      const product = await productModel.findById(id);

      if (!product) {
        return res.status(404).send({
          status: 404,
          message: "Product not found",
        });
      }

      // Update product fields
      product.product_name = product_name;
      product.descript = descript;
      product.product_img = product_img;
      product.price = price;
      product.amount = amount;

      // Save the updated product
      await product.save();

      return res.status(200).send({
        data: product,
        status: 200,
        message: "Update success",
        success: true,
      });
    } catch (error) {
      return res.status(500).send({
        status: 500,
        message: "Update failed",
        success: false,
        error: error.message, // Send the error message for debugging
      });
    }
  }
);

router.delete(
  "/:id",
  // [passport, roleGuard(["user", "admin"])],
  async function (req, res, next) {
    try {
      const id = req.params.id;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
          message: "invalid id",
          success: false,
          error: ["id is not a ObjectId"],
        });
      }
      await productModel.deleteOne({ _id: id });
      const product = await productModel.find();
      return res.status(200).send({
        status: 200,
        data: product,
        message: "delete success",
        success: true,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        status: 500,
        message: "delete fail",
        success: false,
        error: error.message,
      });
    }
  }
);

module.exports = router;
