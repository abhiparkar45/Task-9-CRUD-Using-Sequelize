const express = require("express");
const Product = require("./routes/products");
const Category = require("./routes/categories");

const app = express();

app.use(express.json());

app.use("/api/products", Product);
app.use("/api/categories", Category);

app.use(async (err, req, res, next) => {
  const error = await err;
  if (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error !",
    });
  }
});

module.exports = app;
