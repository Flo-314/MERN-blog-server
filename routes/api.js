var express = require("express");
var router = express.Router();
require("dotenv").config();
var express = require("express");
var router = express.Router();
const controller = require("../controller/api")
const passport = require("passport");
const Post = require("../models/post");
const multer  = require('multer')
const upload = multer()

//  passport.authenticate('jwt', { session: false })

router.get("/posts", controller.posts);
router.get("/posts/:id", controller.postsId);
router.get("/posts/:id/comments", controller.postsIdComments);
router.get("/writers", controller.writers);
router.get("/writers/:id", controller.writersId);
router.get("/category/:id", controller.categoryId);

// ONLY FOR ADMINS
router.post("/login",controller.login );
router.get("/user", passport.authenticate('jwt', { session: false }),controller.users)
router.get("/user/:id", passport.authenticate('jwt', { session: false }),controller.userId);
router.post("/post" ,passport.authenticate('jwt', { session: false }) ,upload.single("image"), controller.postPost);
router.put("/post",passport.authenticate('jwt', { session: false }) ,upload.single("image"), controller.putPost)
router.delete("/post",passport.authenticate('jwt', { session: false }) ,upload.single("image"), controller.deletePost)
module.exports = router;
