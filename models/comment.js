const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let commentSchema = new Schema({
    content: { type: String, required: true},
    timestamp: { type: Date, required: true },
    username: { type: String,  required: true },
  });
  
module.exports = mongoose.model("comment", commentSchema);
