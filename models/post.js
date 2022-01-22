const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let postSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, required: true },
  image: { type: Schema.Types.ObjectId, ref: "image" },
  user: { type: Schema.Types.ObjectId, ref: "user", required: true },
  published: { type: Boolean, required: true },
  category: { type: String, required: true },
});

module.exports = mongoose.model("post", postSchema);
