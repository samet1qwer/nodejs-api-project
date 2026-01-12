const joi = require("joi");

module.exports.userValidation = joi.object({
  username: joi.string().min(3).required(),
  password: joi.string().min(3).required(),
  email: joi.string().email().required(),
  isAdmin: joi.boolean(),
  comments: joi.array(),
  date: joi.date(),
});

module.exports.loginValidation = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(3).required(),
});
