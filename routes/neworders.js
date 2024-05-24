const express = require("express");
var router = express.Router();
const Newlist = require("../models/newOrders");
// const passport = require("../middleware/passport");
// const roleGuard = require("../middleware/roleGuard");
router.get(
  "/",
  // [passport, roleGuard(["user", "admin"])],
  async function (req, res, next) {
    try {
      let orders = await Newlist.find();
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

router.post("/", async function (req, res, next) {
  try {
    const { orderlist } = req.body;

    if (!Array.isArray(orderlist)) {
      return res.status(400).send({
        status: 400,
        message: "Invalid data format",
        success: false,
      });
    }

    const newList = new Newlist({ orderlist });
    const savedList = await newList.save();

    return res.status(200).send({
      data: savedList,
      status: 200,
      message: "create success",
      success: true,
    });
  } catch (error) {
    return res.status(500).send({
      status: 500,
      message: "create fail",
      success: false,
    });
  }
});

module.exports = router;
