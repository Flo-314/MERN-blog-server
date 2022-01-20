require("dotenv").config();
var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcryptjs");



router.post("/login", (req, res) => {
  let { username, password } = req.body;
   let user = User.findOne({username:username})
  if (username === user.username) {
    if (bcrypt.compareSync(password, user.password) === true) {
      opts.expiresIn = 120; //token expires in 2min
      const secret = process.env.secretkey;
      const token = jwt.sign({ username }, secret, opts);
      return res.status(200).json({
        message: "Auth Passed",
        token,
      });
    }
  }
  return res.status(401).json({ message: "Auth Failed" });
});
module.exports = router;
