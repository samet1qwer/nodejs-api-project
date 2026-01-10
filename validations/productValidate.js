const Joi = require("joi");

module.exports.productSchema = Joi.object({
  name: Joi.string().min(3).required(),
  description: Joi.string().min(3).required(),
  price: Joi.number().min(0).required(),
  isActive: Joi.boolean(),
  category: Joi.string().required(),
});
