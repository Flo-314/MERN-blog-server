const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userSchema = new Schema({
  email: { type: String, required: true, maxLength: 75 },
  password: { type: String, required: true },
  name: { type: String, required: true },
  username: { type: String, required: true },
});

module.exports = mongoose.model("user", userSchema);
