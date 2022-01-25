const Posts = require("../../models/post");
const User = require("../../models/user");
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Post = require("../../models/post");
const Image = require("../../models/image");


exports.posts = async (req, res, next) => {
  let posts = await Posts.find({}).populate("user image").populate({path:"user",populate:"image"})

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
  let post = await Posts.findOne({ title }).populate("user").populate({path:"user",populate:"image"})
  if(post){
  // saco la información confidencial del user
  post.user = { username: post.user.username, image:post.user.image};
  console.log(post.user.image)

  res.json({ post });
}
};


exports.login = async (req, res) => {
    let { username, password } = req.query;
    let user = await User.findOne({ username });
  
    if (user !== null) {
  console.log(user.id)
  
      if (bcrypt.compareSync(password, user.password) === true) {
        const opts = {};
        opts.expiresIn = 1800;
        const secret = process.env.secretkey;
        const token = jwt.sign({ username }, secret, opts);
        return res.status(200).json({
          userId: user._id,
          message: "Auth Passed",
          token,
     
        });
      } else {
        return res.status(401);
      }
    }
    return res.status(401).json({ message: "Auth Failed" });
  };

  exports.writers = async (req, res, next) => {
    let users = await User.find({});
    res.json({ users });
  };
  
  exports.writerId = async (req, res, next) => {
    const _id = req.params.id;
    let user = await User.find({ _id })
    res.json({ user });
  };
  
  
  exports.postPost = async (req, res,next) => {
    console.log(req.body);
    console.log(req.file)
    let newImage = {id: undefined}
  
    if (req.file) {
      newImage = new Image({
        name: req.file.fieldname,
        desc: req.file.originalname,
        img: {
          data: req.file.buffer,
          contentType: req.file.mimetype,
        },
      });
      await newImage.save((err) => {
        if (err) {
          return next(err);
        }
      });
  
      let newPost = Post({
        title: req.body.title,
        content: req.body.content,
        category: req.body.category,
        published: req.body.published,
        timestamp: new Date().toLocaleDateString("en-US"),
        image: newImage.id,
        user: req.body.user
      });
      await newPost.save((err) => {
        if (err) {
          return next(err);
        }
      });
      
      res.json({msg:"post done"});
    }
  }
  
  
  exports.putPost = async(req,res) => {
      let post = await Post.updateOne({"_id": req.body.id},{
        title: req.body.title,
        content: req.body.content,
        category: req.body.category,
        published: req.body.published,
      })
      res.json({msg:"done"})
  
  
  }
  
  exports.deletePost =async (req,res) => {
    console.log(req.body)
    await Post.deleteOne({"_id":req.body.id})
    res.json({msg:"done"})
  
  }
  
  