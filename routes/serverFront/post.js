var express = require("express");
var router = express.Router();
var path = require("path");
const Post = require("../../models/post");
/* GET home page. */

router.get("/", function (req, res, next) {
  if (req.user) {
    res.render("form-post");
  } else {
    res.redirect("/");
  }
});

module.exports = router;

router.post("/", async (req, res) => {
  console.log(req.body);
  let image = {
    id: undefined,
  };
  if (req.user) {
    let newPost = Post({
      title: req.body.title,
      content: req.body.content,
      timestamp: new Date(),
      image: image.id,
      user: req.user.id,
    });
    await newPost.save((err) => {
      if (err) {
        return next(err);
      }
    });
    res.redirect("/posts/" + newPost.id);
  }
});
