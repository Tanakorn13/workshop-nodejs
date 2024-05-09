var express = require("express");
var router = express.Router();
const jwt = require("../middleware/jwt");
const bcrypt = require("bcrypt");
const Users = require("../models/users");
const passport = require("../middleware/passport");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/login", async function (req, res, next) {
  // if (!req.user.approve) return res.send('Welcome')
  try {
    let { password, username } = req.body;
    let user = await Users.findOne({
      username: username,
    });
    if (!user) {
      return res.status(500).send({
        status: 500,
        message: "login fail",
        success: false,
        error: ["user not found! please register"],
      });
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(500).send({
        status: 500,
        message: "login fail",
        success: false,
        error: ["wrong password"],
      });
    }
    if (!user.approve) {
      res.status(400).send({ message: "wait for approve" });
    } else if (user.approve) {
      const { _id, approve, role } = user;
      const payload = { _id, approve, role };
      const token = jwt.signToken(payload);

      return res.status(200).send({
        token: token,
        status: 200,
        message: "login success",
        success: true,
      });
    } else {
      return res.status(500).send({
        status: 500,
        message: "login fail",
        success: false,
      });
    }

    // console.log(token);
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 500,
      message: "login fail",
      success: false,
    });
  }
});

module.exports = router;
