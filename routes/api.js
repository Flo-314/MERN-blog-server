var express = require("express");
var router = express.Router();
require("dotenv").config();
var express = require("express");
var router = express.Router();
const controller = require("../controller/api")
const passport = require("passport");

//  passport.authenticate('jwt', { session: false })

router.post("/login",controller.login );
router.get("/posts", controller.posts);
router.get("/posts/:id", controller.postsId);
router.get("/posts/:id/comments", controller.postsIdComments);
router.get("/writers", controller.writers);
router.get("/writers/:id", controller.writersId);
router.get("/category/:id", controller.categoryId);
router.get("/user", passport.authenticate('jwt', { session: false }),controller.users)
router.get("/user/:id", passport.authenticate('jwt', { session: false }),controller.userId);

module.exports = router;
