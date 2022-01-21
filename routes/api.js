var express = require("express");
var router = express.Router();
require("dotenv").config();
var express = require("express");
var router = express.Router();
const controller = require("../controller/api")


router.post("/login",controller.login );
router.post("/posts");
router.post("/posts/:id");
router.post("/posts/:id/comments");
router.post("/users")
router.post("/user/:id");

module.exports = router;
