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
  }


  exports.posts =  (req,res,next) => {}

  exports.postsId = (req,res,next) => {}

  exports.postsIdComments =  (req,res,next) => {}

  exports.users =  (req,res,next) => {}

  exports.userId =  (req,res,next) => {}