const Mongoose = require("mongoose");

const UrlModel = Mongoose.model("url", {
  url: String,
  shortenedUrl: String,
  link: String,
});

module.exports = UrlModel;
