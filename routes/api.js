var express = require("express");
var router = express.Router();
require("dotenv").config();
var express = require("express");
var router = express.Router();
const passport = require("passport");
const multer  = require('multer')
const upload = multer()


const adminController = require("../controller/api/apiAdmin")
const userController = require("../controller/api/apiUser")

//  passport.authenticate('jwt', { session: false })

router.get("/posts", userController.posts);
router.get("/posts/:id", userController.postsId);
router.get("/posts/:id/comments", userController.postsIdComments);
router.get("/writers", userController.writers);
router.get("/writers/:id", userController.writersId);
router.get("/category/:id", userController.categoryId);

// ONLY FOR ADMINS
router.post("/login",adminController.login );
router.get("/user", passport.authenticate('jwt', { session: false }),adminController.writers)
router.get("/user/:id", passport.authenticate('jwt', { session: false }),adminController.writerId);
router.post("/post" ,passport.authenticate('jwt', { session: false }) ,upload.single("image"), adminController.postPost);
router.put("/post",passport.authenticate('jwt', { session: false }) ,upload.single("image"), adminController.putPost)
router.delete("/post",passport.authenticate('jwt', { session: false }) ,upload.single("image"), adminController.deletePost)
module.exports = router;
