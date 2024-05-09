var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const Users = require("../models/users");
const passport = require("../middleware/passport");
const roleGuard = require("../middleware/roleGuard");

/* GET users listing. */
router.get(
  "/",
  [passport, roleGuard(["user", "admin"])],
  async function (req, res, next) {
    // console.log(req.user);
    try {
      const users = await Users.find();
      return res.status(200).send({
        data: users,
        message: "Success",
        success: true,
      });
    } catch (error) {
      return res.status(500).send({
        message: "Fail",
        success: false,
      });
    }
  }
);

router.post("/register", async function (req, res, next) {
  try {
    let { password, username, firstName, lastName, email } = req.body;
    let hashPassword = await bcrypt.hash(password, 10);
    const newUser = new Users({
      username,
      password: hashPassword,
      firstName,
      lastName,
      email,
    });
    // console.log(newUser);
    const user = await newUser.save();
    return res.status(200).send({
      data: { _id: user._id, username, firstName, lastName, email },
      status: 200,
      message: "create success",
      success: true,
    });
  } catch (error) {
    // console.log(error);
    return res.status(500).send({
      status: 500,
      message: "create fail",
      success: false,
    });
  }
});

router.put(
  "/approve/:id",
  [passport, roleGuard(["admin"])],
  async function (req, res, next) {
    try {
      let { approve } = req.body;
      let update = await Users.findByIdAndUpdate(
        req.params.id,
        { approve },
        { new: true }
      );
      return res.status(200).send({
        update,
        status: 200,
        message: "Update success",
        success: true,
      });
    } catch (error) {
      return res.status(500).send({
        status: 500,
        message: "create fail",
        success: false,
      });
    }
  }
);

module.exports = router;
