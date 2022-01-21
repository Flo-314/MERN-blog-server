const Posts = require("../models/post");
const User = require("../models/user");

exports.login = async (req, res) => {
  let { username, password } = req.body;
  let user = await User.findOne({ username });
  console.log(user);
  if (user !== null) {
    if (bcrypt.compareSync(password, user.password) === true) {
      const opts = {};
      opts.expiresIn = 120; //token expires in 2min
      const secret = process.env.secretkey;
      const token = jwt.sign({ username }, secret, opts);
      return res.status(200).json({
        message: "Auth Passed",
        token,
      });
    }
  }
  return res.status(401).json({ message: "Auth Failed" });
};

exports.posts = async (req, res, next) => {
  let posts = await Posts.find({});
  res.json({ posts });
};

exports.postsId = async (req, res, next) => {
  const title = req.params.id;
  let post = await Posts.find({ title });
  res.json({ post });
};

exports.postsIdComments = async (req, res, next) => {
  const title = req.params.id;
  let post = await Posts.find({ title })
  let comments;
  if(post.comments){
      post.populate("comments")
       comments = post.comments;

  }
  res.json({comments})

};

exports.users = async (req, res, next) => {
  let users = await User.find({});
  res.json({ users });
};

exports.userId = async (req, res, next) => {
  const name = req.params.id;
  let user = await User.find({name});
  res.json({ user });
};
