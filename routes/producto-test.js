//container import
const mocker = require("../src/mocks/productoMocker");
const productMocker = new mocker(5);




//express import
const express = require("express");
const { faker } = require("@faker-js/faker");
const routerProductoTest = express.Router();

routerProductoTest.get("/producto-test", async (req, res) => {

  allArticles = await productMocker.generateRandomProducts();
  console.log(allArticles);
  res.render("allProducts", { allArticles });
});

module.exports = routerProductoTest;
