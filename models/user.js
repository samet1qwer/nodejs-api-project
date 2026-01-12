const mongoose = require("mongoose");
const comments = require("./comments");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, "secretkey");
  return token;
};

module.exports = mongoose.model("User", userSchema);
