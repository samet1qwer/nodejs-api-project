const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const mongoose = require("mongoose");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ? Database

const url = "mongodb://127.0.0.1:27017/shopapp";

mongoose
  .connect(url)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  });

// ? schema

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  isActive: Boolean,
  imgUrl: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("Product", productSchema);

const products = [
  {
    name: "Product 1",
    description: "Description for Product 1",
    price: 19.99,
    isActive: true,
    imgUrl: "https://example.com/product1.jpg",
  },
  {
    name: "Product 2",
    description: "Description for Product 2",
    price: 24.99,
    isActive: false,
    imgUrl: "https://example.com/product2.jpg",
  },
];

products.forEach((product) => {
  const newProduct = new Product(product);
  newProduct.save();
});

// ? cors

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
// ? routers

const homeRouter = require("./routers/Home");
const productsRouter = require("./routers/Producks");
app.use("/api", homeRouter);
app.use("/api", productsRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
