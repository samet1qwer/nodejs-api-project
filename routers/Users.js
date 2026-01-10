const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Joi = require("joi");
const { userValidation } = require("../validations/userValidate");
const comments = require("../models/comments");
const bcrypt = require("bcrypt");
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/users", async (req, res) => {
  const { error } = userValidation.validate(req.body);
  if (error) {
    return res.status(400).send({
      message: error.details[0].message,
    });
  }

  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const password = await bcrypt.hash(req.body.password, 10);

  const user = new User({
    username: req.body.username,
    password: password,
    email: req.body.email,
    comments: [],
  });

  const savedUser = await user.save();

  if (!savedUser) {
    return res.status(500).json({ message: "Error creating user" });
  }
  res.json(savedUser);
});

module.exports = router;
