require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const jwt = require("jsonwebtoken");
const db = require("./helperModules/db");

var indexRouter = require("./routes/index");
let PostRouter = require("./routes/post");
let PostsRouter = require("./routes/posts");
let userRouter = require("./routes/users");
let loginRouter = require("./routes/login");
let signupRouter = require("./routes/signupRouter");

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

app.use("/", indexRouter);
app.use("/post", PostRouter);
app.use("/posts", PostsRouter);
app.use("/log-in", loginRouter);
app.use("/sign-up", signupRouter);
app.use("/user", userRouter);

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
  res.render("error");
});

module.exports = app;
