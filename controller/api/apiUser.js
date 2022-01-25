const Posts = require("../../models/post");
const User = require("../../models/user");
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Post = require("../../models/post");
const Image = require("../../models/image");

exports.posts = async (req, res, next) => {
    let posts = await Posts.find({"published": true}).populate("user image").populate({path:"user",populate:"image"})
  
    // saco la información confidencial del user
    posts = posts.map((post) => {
      let newPost = post;
      newPost.user = { username: post.user.username, image:post.user.image };
      return newPost;
    });
  
    res.json({ posts });
  };
  
  exports.postsId = async (req, res, next) => {
    const title = req.params.id;
    let post = await Posts.findOne({ title, "published": true }).populate("user").populate({path:"user",populate:"image"})
    if(post){
    // saco la información confidencial del user
    post.user = { username: post.user.username, image:post.user.image};
  
    res.json({ post });
  }
  };
  
  exports.postsIdComments = async (req, res, next) => {
    const title = req.params.id;
    let post = await Posts.find({ title, "published": true });
    let comments;
    if (post.comments) {
      post.populate("comments ");
      comments = post.comments;
    }
    res.json({ comments });
  };
  
  exports.writers = async (req, res, next) => {
    let writers = await User.find({}).populate("image")
    writers = writers.map((writer) => {
      let newWriter = {
        username: writer.username,
        _id: writer._id,
        image: writer.image
      };
      return newWriter;
    });
    res.json({ writers });
  };
  
  exports.writersId = async (req, res, next) => {
    const writer = req.params.id;
    let posts = await Posts.find({ username: writer }).populate("user image").populate({path:"user",populate:"image"})
  
    // saco la información confidencial del user
    posts = posts.map((post) => {
      let newPost = post;
      newPost.user = { username: post.user.username,  image:post.user.image };
      return newPost;
    });
    res.json({ posts });
  };
 
  exports.categoryId = async (req, res, next) => {
    const category = req.params.id;
    let posts = await Posts.find({ category }).populate("user image").populate({path:"user",populate:"image"})
    res.json({ posts });
  };