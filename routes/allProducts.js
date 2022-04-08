//container import
const Productos = require("../container/productos.js");
const product = new Productos();

//express import
const express = require("express");
const routerProductos = express.Router();


routerProductos.get("/productos", async (req, res) => {
  const allArticles = await product.getAll();
  res.json(allArticles);
});

routerProductos.post("/productos", async (req, res) => {
  const product = req.body;
  const productIsSave = await product.save(product);
  res.json(productIsSave);
});

routerProductos.put("/productos/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const product = req.body;
  const result = await product.actualizarById(id, product);
  res.json(result);
});

routerProductos.delete("/productos/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const result = product.deleteById(id);
  res.json(result);
});

module.exports = routerProductos;
