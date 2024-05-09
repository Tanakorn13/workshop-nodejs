const mongoose = require("mongoose");
const users = new mongoose.Schema(
  {
    username: { type: String, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, default: "user" },
    approve: { type: Boolean, default: false },
  },
  { timestamps: true }
);
module.exports = mongoose.model("users", users);
