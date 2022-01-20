var mongoose = require("mongoose");
var Schema = mongoose.Schema;

let imageSchema = new Schema({
  name: String,
  desc: String,
  img: {
    data: Buffer,
    contentType: String,
  },
});
imageSchema.virtual("src").get(function () {
  return `data:${
    this.img.contentType
  };base64,${Buffer.from(this.img.data).toString("base64")}`;
});

module.exports = mongoose.model("Image", imageSchema);
