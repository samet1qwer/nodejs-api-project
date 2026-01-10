const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  text: String,
  username: String,
  date: {
    type: Date,
    default: Date.now,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
});

module.exports = mongoose.model("Comment", commentSchema);
