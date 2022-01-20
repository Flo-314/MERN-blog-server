require("dotenv").config();
var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const passport = require("passport")
const passportConfig  = require("../helperModules/passportConfig")


router.post("/", async (req, res) => {
  let { username, password } = req.body;
   let user = await User.findOne({username})
   console.log(user)
  if (user !== null) {
    if (bcrypt.compareSync(password, user.password) === true) {
      const opts = {}
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

router.get("/protected", passport.authenticate('jwt', { session: false }),
function(req, res) {
    res.send(req.user.profile);
}
);
module.exports = router;

