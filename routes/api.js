var express = require("express");
var router = express.Router();

router.Post("/");
router.Post("/posts");
router.Post("/posts/:id");
router.Post("/posts/:id/comments");
router.Post("/user/:id");

module.exports = router;
