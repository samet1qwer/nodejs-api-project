const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const mongoose = require("mongoose");
const { error } = require("./middlware/error");
const { logger } = require("./middlware/logger");
const config = require("config");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ? Database

const url = "mongodb://127.0.0.1:27017/shopapp";

mongoose
  .connect(url)
  .then(() => {
    logger.info("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  });

// ? Models

const Category = require("./models/category");
const Product = require("./models/product");
const Comment = require("./models/comments");
const User = require("./models/user");
// ? cors

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
// ? routers
app.use(error);

const homeRouter = require("./routers/Home");
const productsRouter = require("./routers/Products");
const usersRouter = require("./routers/Users");
app.use("/api", homeRouter);
app.use("/api", productsRouter);
app.use("/api", usersRouter);

app.listen(port, () => {
  logger.info(`Example app listening at http://localhost:${port}`);
});
