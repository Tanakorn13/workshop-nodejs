const express = require("express");
var router = express.Router();
const Orders = require("../models/orders");
const passport = require("../middleware/passport");
const roleGuard = require("../middleware/roleGuard");
router.get(
  "/",
  // [passport, roleGuard(["user", "admin"])],
  async function (req, res, next) {
    try {
      let orders = await Orders.find();
      return res.status(200).send({
        status: 200,
        data: orders,
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

module.exports = router;
