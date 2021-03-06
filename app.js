require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const jwt = require("jsonwebtoken");
const db = require("./helperModules/db");
const session = require("express-session");
const passport = require("passport");
const jwtPassport = require("passport-jwt");
const passportConfig = require("./helperModules/passportConfig");
var flash = require("connect-flash");
const cors = require("cors")




let apiRouter = require("./routes/api")
let signupRouter = require("./routes/signup")
var app = express();
db.connection();

// view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(flash());
app.use(cors({
  origin: "*"
}))


app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
passport.use(passportConfig.strategy);
passport.use(passportConfig.jwtStrategry)
passport.serializeUser(passportConfig.serializeUser);
passport.deserializeUser(passportConfig.deserializeUser);

app.use(passport.initialize());
app.use(passport.session());
app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});




// cosas de api
app.use("/api", apiRouter)
app.use("/sign-up", signupRouter);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
});

module.exports = app;
