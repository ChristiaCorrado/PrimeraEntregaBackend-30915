//container import
const Productos = require("../container/productos.js");
const product = new Productos();

//express import
const express = require("express");
const { json } = require("express/lib/response");
const routerProductos = express.Router();


routerProductos.get("/productos", async (req, res) => {
  allArticles = await product.getAll();
  res.json(allArticles)
});

routerProductos.post("/productos", async (req, res) => {
  const art = req.body
  art.timestamp = Date.now();
  console.log(art);  
  const productIsSave = await product.saveNewProduct(art);
  res.json(productIsSave);
  console.log(`Producto grabado correctamente`);
});

routerProductos.put("/productos/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const productToUpd = req.body;
  const result = await product.actualizarById(id, productToUpd);
  res.json(result);
});

routerProductos.delete("/productos/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const result = product.deleteById(id);
  res.json(result);
});

routerProductos.get("/productos/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const filter = await product.getById(id) ;
  res.json(filter);
})


module.exports = routerProductos;
