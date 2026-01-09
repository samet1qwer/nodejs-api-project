const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
