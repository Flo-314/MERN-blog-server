var express = require("express");
var router = express.Router();
const Posts = require("../../models/post");
/* GET home page. */
router.get("/", async (req, res, next) => {
  let posts = await Posts.find({});

  res.render("index", { user: req.user, posts });
});

router.post("/", async (req, res) => {
  if(req.user){
  await Post.findByIdAndRemove({ _id: req.body.postid });
  let posts = await Post.find({}).populate("user");
  res.render("index", { posts: posts, user: req.user });
  }
});

router.get("/log-out", function (req, res, next) {
  if (req.user) {
    req.logout();
  }
  res.redirect("/");
});

module.exports = router;
