const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const producs = [
  {
    id: 1,
    name: "Product 1",
    description: "Description for Product 1",
  },
  {
    id: 2,
    name: "Product 2",
    description: "Description for Product 2",
  },
  {
    id: 3,
    name: "Product 3",
    description: "Description for Product 3",
  },
];

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/products", (req, res) => {
  res.send(producs);
});

app.get("/products/:id", (req, res) => {
  const id = req.params.id;
  const product = producs.find((p) => p.id == id);
  if (!product) {
    res.status(404).send("Product not found");
  }
  res.send(product);
});

app.post("/products", (req, res) => {
  const product = {
    id: producs.length + 1,
    name: req.body.name,
    description: req.body.description,
  };

  producs.push(product);
  res.send(product);
});
app.put("/products/:id", (req, res) => {
  const id = req.params.id;

  const product = producs.find((p) => p.id == id);

  if (!product) {
    return res.status(404).send("Product not found");
  }

  if (!req.body.name || !req.body.description) {
    return res.status(400).send("Missing fields");
  }

  product.name = req.body.name;
  product.description = req.body.description;

  res.status(200).json(product);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
