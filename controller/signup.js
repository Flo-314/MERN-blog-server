var mongoose = require("mongoose");
const { body, validationResult } = require("express-validator");
const User = require("../models/user");
const Image = require("../models/image");
require("dotenv").config();
var bcrypt = require("bcryptjs");

exports.index = (req, res, next) => {

};
exports.post = [
  body("name", "MIN FULL NAME LENGTH IS 4.")
    .trim()
    .isLength({ max: 50, min: 4 })
    .escape(),
  body("email", "PLEASE INTRODUCE A VALID EMAIL")
    .trim()
    .isLength({ max: 50, min: 5 })
    .escape(),
  body("username", "MIN USERNAME LENGTH IS 4")
    .trim()
    .isLength({ max: 50, min: 4 })
    .escape(),
  body("password", "MIN PASSWORD LENGTH IS 8")
    .trim()
    .isLength({ max: 50, min: 8 })
    .escape(),
  body(
    "confpassword",
    "password Confirmation field must have the same value as the password field"
  )
    .exists()
    .custom((value, { req }) => value === req.body.password),
  body("secretpassword", "try later").trim().escape(),

  async (req, res, next) => {
    const errors = validationResult(req);



    //chekea la clave supersecreta
    if (req.body.secretpassword === process.env.secretkey) {
      if (errors.isEmpty()) {
        let userUsername = await User.find({ username: req.body.username });
        let userEmail = await User.find({ email: req.body.email });


          console.log(userEmail.length === 0, userUsername.length === 0)
        if (userEmail.length === 0 && userUsername.length === 0) {
          //if everything is ok
          let salt = bcrypt.genSaltSync(10);
          let password = bcrypt.hashSync(req.body.password, salt);
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
          }
          newUser = new User({
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            password: password,
            image: newImage.id,
          });

          await newUser.save((err) => {
            if (err) {
              return next(err);
            }
          });
          res.json({sucess:"sucess"})
        }
        //si ya ESTA usado el mail o el username
        else {
          res.json({errors: {msg:"username or email already used"}});

        }
      }
      //si hay errores de validacion
      else{ 
        res.json({errors:errors.array()[0]})
      }
    }
    else{
    res.json({errors:{msg:"Incorrect superSecret Code"}});
  }
  },
];
