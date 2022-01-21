const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
require("dotenv").config;

// strategy for admin in the local blog
let strategy = new LocalStrategy((username, password, done) => {
  User.findOne({ username: username }, (err, user) => {
    if (err) {
      return done(err);
    }

    if (!user) {
      return done(null, false, { message: "Incorrect username" });
    }

    bcrypt.compare(password, user.password, function (err, res) {
      if (err) {
        done(err);
      }
      if (res !== false) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Incorrect password" });
      }
    });
  });
});

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.secretkey;
const jwtStrategry = new JwtStrategy(opts, (jwt_payload, done) => {
  User.findOne({ username: jwt_payload.username }, function (err, user) {
    if (err) {
      return done(err, false);
    }
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
      // or you could create a new account
    }
  });
});

let serializeUser = (user, done) => {
  done(null, user.id);
};
let deserializeUser = (id, done) => {
  User.findById(id, function (err, user) {
    done(err, user);
  });
};

exports.jwtStrategry = jwtStrategry;
exports.strategy = strategy;
exports.deserializeUser = deserializeUser;
exports.serializeUser = serializeUser;
