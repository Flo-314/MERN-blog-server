var express = require("express");
var router = express.Router();
require("dotenv").config();
var express = require("express");
var router = express.Router();
const controller = require("../controller/api")
//  passport.authenticate('jwt', { session: false }

router.post("/login",controller.login );
router.get("/posts", controller.posts);
router.get("/posts/:id", controller.postsId);
router.get("/posts/:id/comments", controller.postsIdComments);
router.get("/users",controller.users)
router.get("/user/:id",controller.userId);

module.exports = router;
