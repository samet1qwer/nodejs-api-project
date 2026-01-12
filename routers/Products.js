const express = require("express");
const router = express.Router();
const { access } = require("../middlware/auth");
const Product = require("../models/product");
const Joi = require("joi");
const { productSchema } = require("../validations/productValidate");

const validateProduct = (req, res, next) => {
  const { error } = productSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }

  next();
};

router.get("/products", access, async (req, res) => {
  try {
    const products = await Product.find().populate("category", "name -_id");
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/products/:id", access, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/products", access, validateProduct, async (req, res) => {
  try {
    const product = new Product({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      isActive: true,
      imgUrl: "https://picsum.photos/200/300",
      category: req.body.category,
      comments: [],
    });

    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/products/:id", access, validateProduct, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.name = req.body.name;
    product.description = req.body.description;
    product.price = req.body.price;
    product.category = req.body.category;
    product.isActive = req.body.isActive ?? product.isActive;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/products/:id", access, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
