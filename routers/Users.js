const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const user = require("../models/user");
const Joi = require("joi");
const { userValidation } = require("../validations/userValidate");

module.exports = router;
