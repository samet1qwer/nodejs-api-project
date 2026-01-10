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

// ? Models

const Category = require("./models/category");
const Product = require("./models/product");
const Comment = require("./models/comments");

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
const productsRouter = require("./routers/Products");
app.use("/api", homeRouter);
app.use("/api", productsRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
