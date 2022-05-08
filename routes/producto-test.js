//container import
const mocker = require("../src/mocks/productoMocker");
const productMocker = new mocker(5);
const chatSocket = require("../container/chat");
const chat = new chatSocket();

//express import
const express = require("express");
const { faker } = require("@faker-js/faker");
const routerProductoTest = express.Router();
const app = express();
const { Server: IOServer, Socket } = require("socket.io");
const { Server: HttpServer } = require("http");
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

routerProductoTest.get("/producto-test", async (req, res) => {
  allArticles = await productMocker.generateRandomProducts();
  console.log(allArticles);
  res.render("allProducts", { allArticles });


  
});

module.exports = routerProductoTest;
