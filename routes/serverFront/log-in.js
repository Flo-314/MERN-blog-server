var express = require("express");
var router = express.Router();
const passport = require("passport");

/* GET home page. */
router.get("/", function (req, res, next) {
  if (!req.user) {
  } else {
    res.redirect("/");
  }
});

router.post(
  "/",
  passport.authenticate("local", {
  })
);
module.exports = router;
