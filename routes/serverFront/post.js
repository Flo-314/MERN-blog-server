var express = require("express");
var router = express.Router();
const Post = require("../../models/post");
const passport = require("passport");




router.post("/",passport.authenticate('jwt', { session: false }), async (req, res) => {
  console.log(req.body);
  let image = {
    id: undefined,
  };
  if (req.user) {
    let newPost = Post({
      title: req.body.title,
      content: req.body.content,
      timestamp: new Date().toLocaleDateString("en-US"),
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
module.exports = router;
