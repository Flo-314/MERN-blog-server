const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/users");
const bcrypt = require("bcryptjs");

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

let serializeUser = (user, done) => {
  done(null, user.id);
};
let deserializeUser = (id, done) => {
  User.findById(id, function (err, user) {
    done(err, user);
  });
};

exports.strategy = strategy;
exports.deserializeUser = deserializeUser;
exports.serializeUser = serializeUser;
