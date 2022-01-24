const Posts = require("../models/post");
const User = require("../models/user");
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const post = require("../models/post");

exports.login = async (req, res) => {
  let { username, password } = req.query;
  let user = await User.findOne({ username });

  if (user !== null) {
    console.log(user.password)
    console.log(bcrypt.compareSync(password, user.password))

    if (bcrypt.compareSync(password, user.password) === true) {
      const opts = {};
      opts.expiresIn = 1800; //token expires in 2min
      const secret = process.env.secretkey;
      const token = jwt.sign({ username }, secret, opts);
      return res.status(200).json({
        message: "Auth Passed",
        token,
      });
    } else {
      return res.status(401);
    }
  }
  return res.status(401).json({ message: "Auth Failed" });
};

exports.posts = async (req, res, next) => {
  let posts = await Posts.find({}).populate("user");

  // saco la información confidencial del user
  posts = posts.map((post) => {
    let newPost = post;
    newPost.user = { username: post.user.username };
    return newPost;
  });

  res.json({ posts });
};

exports.postsId = async (req, res, next) => {
  const title = req.params.id;
  let post = await Posts.find({ title }).populate("user");

  // saco la información confidencial del user
  post = post[0];
  post.user = { username: post.user.username };

  res.json({ post });
};

exports.postsIdComments = async (req, res, next) => {
  const title = req.params.id;
  let post = await Posts.find({ title });
  let comments;
  if (post.comments) {
    post.populate("comments");
    comments = post.comments;
  }
  res.json({ comments });
};

exports.writers = async (req, res, next) => {
  let writers = await User.find({});
  writers = writers.map((writer) => {
    let newWriter = {
      username: writer.username,
      _id: writer._id,
    };
    return newWriter;
  });
  res.json({ writers });
};

exports.writersId = async (req, res, next) => {
  const writer = req.params.id;
  let posts = await Posts.find({ username: writer }).populate("user");

  // saco la información confidencial del user
  posts = posts.map((post) => {
    let newPost = post;
    newPost.user = { username: post.user.username };
    return newPost;
  });
  res.json({ posts });
};

exports.categoryId = async (req, res, next) => {
  const category = req.params.id;
  let posts = await Posts.find({ category });
  res.json({ posts });
};

exports.users = async (req, res, next) => {
  let users = await User.find({});
  res.json({ users });
};

exports.userId = async (req, res, next) => {
  const name = req.params.id;
  let user = await User.find({ name });
  res.json({ user });
};
