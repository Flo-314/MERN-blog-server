var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { user: req.user });
});
router.get("/log-out", function (req, res, next) {
  if (req.user) {
    req.logout();
  }
  res.redirect("/");
});

module.exports = router;
