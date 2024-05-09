const passport = require("passport");
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = require("../models/users");

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

opts.secretOrKey = process.env.JWT_KEY;

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      // console.log(jwt_payload);
      //   console.log();
      const user = await User.findById(jwt_payload._id).select(
        "_id username approve role"
      );
      // console.log(user);
      if (user) {
        if (user.approve) {
          return done(null, user);
        }
        console.log("not approve");
        return done(null, false, { message: "User not approve" });
      } else {
        console.log("hello");
        return done(null, false, { message: "User not found" });
      }
    } catch (error) {
      return done(error, false);
    }
  })
);

module.exports = passport.authenticate("jwt", { session: false });
