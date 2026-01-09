const express = require("express");
const router = express.Router();
const Product = require("../models/product");

router.get("/products", (req, res) => {
  const producs = Product.find();
  res.send(producs);
});

router.get("/products/:id", (req, res) => {
  const id = req.params.id;
  const product = Product.findById(id);
  if (!product) {
    res.status(404).send("Product not found");
  }
  res.send(product);
});

router.post("/products", async (req, res) => {
  try {
    const product = new Product({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      isActive: true,
      imgUrl: "https://picsum.photos/200/300",
    });

    const savedProduct = await product.save();

    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/products/:id", async (req, res) => {
  const id = req.params.id;

  const product = await Product.findById(id);

  if (!product) {
    return res.status(404).send("Product not found");
  }

  if (!req.body.name || !req.body.description) {
    return res.status(400).send("Missing fields");
  }

  product.name = req.body.name;
  product.description = req.body.description;
  product.price = req.body.price;

  const savedProduct = await product.save();

  res.status(200).json(savedProduct);
});

router.delete("/products/:id", async (req, res) => {
  const id = req.params.id;
  const product = await Product.findByIdAndDelete(id);
  if (!product) {
    res.status(404).send("Product not found");
  }
  res.send(product);
});

module.exports = router;
