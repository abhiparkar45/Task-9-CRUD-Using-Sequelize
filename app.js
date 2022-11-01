const express = require("express");
const Product = require("./routes/products");
const Category = require("./routes/categories");

const app = express();

app.use(express.json());

app.use("/api/products",Product);
app.use("/api/categories",Category);

module.exports = app;